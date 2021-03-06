import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Animated,
    PanResponder,
} from 'react-native';

const ModePropType = PropTypes.oneOf(['decay', 'snap', 'spring-origin']);
const OvershootPropType = PropTypes.oneOf(['spring', 'clamp']);
const AnimatedPropType = PropTypes.any;

class PanControllers extends React.Component {

    static propTypes = {
        // Component Config
        lockDirection: PropTypes.bool,
        horizontal: PropTypes.bool,
        vertical: PropTypes.bool,
        overshootX: OvershootPropType,
        overshootY: OvershootPropType,
        xBounds: PropTypes.arrayOf(PropTypes.number),
        // yBounds: PropTypes.arrayOf(PropTypes.number),
        xMode: ModePropType,
        // yMode: ModePropType,
        snapSpacingX: PropTypes.number, // TODO: also allow an array of values?
        // snapSpacingY: PropTypes.number,
        // Animated Values
        panX: AnimatedPropType,
        // panY: AnimatedPropType,
        // Animation Config
        overshootSpringConfig: PropTypes.any,
        momentumDecayConfig: PropTypes.any,
        springOriginConfig: PropTypes.any,
        directionLockDistance: PropTypes.number,
        overshootReductionFactor: PropTypes.number,
        // Events
        onOvershoot: PropTypes.func,
        onDirectionChange: PropTypes.func,
        onReleaseX: PropTypes.func,
        // onReleaseY: PropTypes.func,
        onRelease: PropTypes.func,
        //...PanResponderPropTypes,
    }

    // getInitialState() {
    //     //TODO:
    //     // it's possible we want to move some props over to state.
    //     // For example, xBounds/yBounds might need to be
    //     // calculated/updated automatically
    //     //
    //     // This could also be done with a higher-order component
    //     // that just massages props passed in...
    //     return {
    //
    //     };
    // },

    _responder = null
    _listener = null
    _direction = null

    constructor(props) {
        super(props)

        this.deceleration = 0.997;
        if (props.momentumDecayConfig && this.props.momentumDecayConfig.deceleration) {
            this.deceleration = this.props.momentumDecayConfig.deceleration;
        }
    }

    UNSAFE_componentWillMount() {
        this._responder = PanResponder.create({
            onStartShouldSetPanResponder: this.props.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.props.onMoveShouldSetPanResponder,
            onPanResponderGrant: (...args) => {
                if (this.props.onPanResponderGrant) {
                    this.props.onPanResponderGrant(...args);
                }
                let { panX, xMode } = this.props;
                this.handleResponderGrant(panX, xMode);
                this._direction = 'x';
            },

            onPanResponderMove: (_, { dx, x0 }) => {
                let {
                    panX,
                    xBounds,
                    overshootX,
                    horizontal,
                    lockDirection,
                } = this.props;

                if (!this._direction) {
                    this._direction = 'x';
                    if (this.props.onDirectionChange) {
                        this.props.onDirectionChange(this._direction, { dx, x0 });
                    }
                }

                const dir = this._direction;

                if (this.props.onPanResponderMove) {
                    this.props.onPanResponderMove(_, { dx, x0 });
                }

                if (horizontal && (!lockDirection || dir === 'x')) {
                    let [xMin, xMax] = xBounds;

                    this.handleResponderMove(panX, dx, xMin, xMax, overshootX);
                }
            },

            onPanResponderRelease: (_, { vx, dx }) => {
                let {
                    panX,
                    xBounds,
                    overshootX,
                    horizontal,
                    lockDirection,
                    xMode,
                    snapSpacingX,
                } = this.props;

                let cancel = false;
                const dir = this._direction;
                if (this.props.onRelease) {
                    cancel = false === this.props.onRelease({ vx, dx });
                }

                if (!cancel && horizontal && (!lockDirection || dir === 'x')) {
                    let [xMin, xMax] = xBounds;
                    if (this.props.onReleaseX) {
                        cancel = false === this.props.onReleaseX({ vx, dx });
                    }
                    !cancel && this.handleResponderRelease(panX, xMin, xMax, vx, overshootX, xMode, snapSpacingX);
                }
                this._direction = 'x';
            },
        });
    }

    handleResponderMove(anim, delta, min, max, overshoot) {
        let val = anim._offset + delta;

        if (val > max) {
            switch (overshoot) {
                case 'spring':
                    val = max + (val - max) / this.props.overshootReductionFactor;
                    break;
                case 'clamp':
                    val = max;
                    break;
            }
        }
        if (val < min) {
            switch (overshoot) {
                case 'spring':
                    val = min - (min - val) / this.props.overshootReductionFactor;
                    break;
                case 'clamp':
                    val = min;
                    break;
            }
        }
        val = val - anim._offset;
        anim.setValue(val);
    }

    handleResponderRelease(anim, min, max, velocity, overshoot, mode, snapSpacing) {
        anim.flattenOffset();
        if (anim._value < min) {
            if (this.props.onOvershoot) {
                this.props.onOvershoot(); // TODO: what args should we pass to this
            }
            switch (overshoot) {
                case 'spring':
                    Animated.spring(anim, {
                        ...this.props.overshootSpringConfig,
                        toValue: min,
                        velocity,
                    }).start();
                    break;
                case 'clamp':
                    anim.setValue(min);
                    break;
            }
        } else if (anim._value > max) {
            if (this.props.onOvershoot) {
                this.props.onOvershoot(); // TODO: what args should we pass to this
            }
            switch (overshoot) {
                case 'spring':
                    Animated.spring(anim, {
                        ...this.props.overshootSpringConfig,
                        toValue: max,
                        velocity,
                    }).start();
                    break;
                case 'clamp':
                    anim.setValue(min);
                    break;
            }
        } else {
            switch (mode) {
                case 'snap':
                    this.handleSnappedScroll(anim, min, max, velocity, snapSpacing, overshoot);
                    break;

                case 'decay':
                    this.handleMomentumScroll(anim, min, max, velocity, overshoot);
                    break;

                case 'spring-origin':
                    Animated.spring(anim, {
                        ...this.props.springOriginConfig,
                        toValue: 0,
                        velocity,
                    }).start();
                    break;
            }
        }
    }

    handleResponderGrant(anim, mode) {
        switch (mode) {
            case 'spring-origin':
                anim.setValue(0);
                break;
            case 'snap':
            case 'decay':
                anim.setOffset(anim._value + anim._offset);
                anim.setValue(0);
                break;
        }
    }

    handleMomentumScroll(anim, min, max, velocity, overshoot) {
        Animated.decay(anim, {
            ...this.props.momentumDecayConfig,
            velocity,
        }).start(() => {
            anim.removeListener(this._listener);
        });

        this._listener = anim.addListener(({ value }) => {
            if (value < min) {
                anim.removeListener(this._listener);
                if (this.props.onOvershoot) {
                    this.props.onOvershoot(); // TODO: what args should we pass to this
                }
                switch (overshoot) {
                    case 'spring':
                        Animated.spring(anim, {
                            ...this.props.overshootSpringConfig,
                            toValue: min,
                            velocity,
                        }).start();
                        break;
                    case 'clamp':
                        anim.setValue(min);
                        break;
                }
            } else if (value > max) {
                anim.removeListener(this._listener);
                if (this.props.onOvershoot) {
                    this.props.onOvershoot(); // TODO: what args should we pass to this
                }
                switch (overshoot) {
                    case 'spring':
                        Animated.spring(anim, {
                            ...this.props.overshootSpringConfig,
                            toValue: max,
                            velocity,
                        }).start();
                        break;
                    case 'clamp':
                        anim.setValue(min);
                        break;
                }
            }
        });
    }

    handleSnappedScroll(anim, min, max, velocity, spacing) {
        let endX = this.momentumCenter(anim._value, velocity, spacing);
        endX = Math.max(endX, min);
        endX = Math.min(endX, max);
        const bounds = [endX - spacing / 2, endX + spacing / 2];
        const endV = this.velocityAtBounds(anim._value, velocity, bounds);

        this._listener = anim.addListener(({ value }) => {
            if (value > bounds[0] && value < bounds[1]) {
                Animated.spring(anim, {
                    toValue: endX,
                    velocity: endV,
                }).start();
            }
        });

        Animated.decay(anim, {
            ...this.props.momentumDecayConfig,
            velocity,
        }).start(() => {
            anim.removeListener(this._listener);
        });
    }

    closestCenter(x, spacing) {
        const plus = (x % spacing) < spacing / 2 ? 0 : spacing;
        return Math.round(x / spacing) * spacing + plus;
    }

    momentumCenter(x0, vx, spacing) {
        let t = 0;
        let x1 = x0;
        let x = x1;

        while (true) {
            t += 16;
            x = x0 + (vx / (1 - this.deceleration)) *
                (1 - Math.exp(-(1 - this.deceleration) * t));
            if (Math.abs(x - x1) < 0.1) {
                x1 = x;
                break;
            }
            x1 = x;
        }
        return this.closestCenter(x1, spacing);
    }

    velocityAtBounds(x0, vx, bounds) {
        let t = 0;
        let x1 = x0;
        let x = x1;
        let vf;
        while (true) {
            t += 16;
            x = x0 + (vx / (1 - this.deceleration)) *
                (1 - Math.exp(-(1 - this.deceleration) * t));
            vf = (x - x1) / 16;
            if (x > bounds[0] && x < bounds[1]) {
                break;
            }
            if (Math.abs(vf) < 0.1) {
                break;
            }
            x1 = x;
        }
        return vf;
    }

    // componentDidMount() {
    //    //TODO: we may need to measure the children width/height here?
    // },
    //
    // componentWillUnmount() {
    //
    // },
    //
    // componentDidUnmount() {
    //
    // },

    render() {
        return <View {...this.props} {...this._responder.panHandlers} />;
    }
};

export default PanControllers;