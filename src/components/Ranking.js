import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';

export default class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        let { style = {}, maxStars = 5, fullStarColor = '#ffda44', emptyStarColor = '#eeeeef', disabled = false, starSize = 20 } = this.props;
        return (
            <StarRating
                starSize={starSize}
                emptyStarColor={emptyStarColor}
                fullStarColor={fullStarColor}
                disabled={disabled}
                maxStars={maxStars}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        );
    }
}

