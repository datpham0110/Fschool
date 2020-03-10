import React, { Component, PureComponent } from "react";
import Utils from "../../app/Utils";
import {
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    ScrollView
} from "react-native";
import HeaderCom from "../../components/HeaderCom";
import { nkey } from "../../app/keys/keyStore";
import { nstyles, nwidth } from "../../styles/styles";
import { Images } from "../../images";
import { colors } from "../../styles/color";
import { sizes } from "../../styles/size";
import { nGlobalKeys } from "../../app/keys/globalKey";
import { deleteChildToAccount } from '../../apis/child';
import { infoPhuhuyenh } from "../../apis/welcome"
import { avatar } from '../../apis/apiLogin';
import ButtonCom from "../../components/Button/ButtonCom";

class ThoaThuanNguoiDung extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.returnData = Utils.ngetParam(this, 'returnData', () => { })
    }
    _submit = () => {
        this.returnData(true);
        Utils.goback(this)
    }
    render() {
        return (
            <View
                style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }
                ]}>
                <ScrollView>
                    {/* ------------------- Header -------------- */}
                    <Text style={styles.header}>THỎA THUẬN NGƯỜI DÙNG ỨNG DỤNG THANH TOÁN VÀ TƯƠNG TÁC TRƯỜNG EM - YSCHOOL</Text>
                    {/* ------------------- MỤC ĐÍCH, ĐỐI TƯỢNG VÀ PHẠM VI ÁP DỤNG  -------------- */}
                    <Text style={styles.title}>•	MỤC ĐÍCH, ĐỐI TƯỢNG VÀ PHẠM VI ÁP DỤNG</Text>
                    <Text style={styles.content}>Thỏa thuận người dùng được ban hành với mục đích là sự thỏa thuận, cam kết giữa khách hàng và Công ty Cổ phần Dịch vụ Thương mại Việt Nam Trực Tuyến (“VNO”) trước và trong quá trình sử dụng ứng dụng thanh toán và tương tác Trường em - Yschool (“Yschool”).</Text>
                    <Text style={styles.content}>Thỏa thuận được áp dụng cho khách hàng là cá nhân, tổ chức có nhu cầu sử dụng các dịch vụ do VNO cung cấp thông qua Yschool.</Text>
                    {/* ------------------- NỘI DUNG THỎA THUẬN NGƯỜI DÙNG YSCHOOL  -------------- */}
                    <Text style={styles.title}>•	NỘI DUNG THỎA THUẬN NGƯỜI DÙNG YSCHOOL</Text>
                    <Text style={styles.content}>Thỏa thuận Người dùng (“Thỏa thuận”) là thỏa thuận pháp lý giữa khách hàng với VNO, quy định các điều khoản trong việc khách hàng sử dụng dịch vụ Yschool. Thỏa thuận này sẽ có hiệu lực khi khách hàng chấp nhận tất cả các điều khoản được nêu tại đây trong khi cài đặt Yschool hoặc khi khách hàng bắt đầu sử dụng Yschool theo bất kỳ cách nào khác.</Text>
                    <Text style={styles.content}>VNO bảo toàn quyền chỉnh sửa nội dung các điều khoản sử dụng này tại bất kì thời điểm nào. VNO sẽ thông báo tới khách hàng khi có cập nhật trong Thỏa thuận này. Bản điều chỉnh có hiệu lực kể từ thời điểm khách hàng nhận được thông báo.
Khách hàng hoàn toàn chịu trách nhiệm trong việc nhận thức và tuân thủ các quy định của pháp luật khi sử dụng Yschool, bao gồm nhưng không giới hạn, đối với những quy định về tính hợp pháp của thông tin do khách cung cấp trên ứng dụng và/hoặc các giao dịch, hàng hóa/dịch vụ cung cấp, nguồn gốc giá trị tiền tệ thanh toán của khách hàng trên Yschool.</Text>
                    {/* ------------------- Định nghĩa  -------------- */}
                    <Text style={styles.title}>•	Định nghĩa</Text>
                    <Text style={styles.content}>•	Công ty Cổ phần Dịch vụ Thương mại Việt Nam Trực Tuyến (“VNO”): Là đơn vị sở hữu và là nhà cung cấp Yschool.</Text>
                    <Text style={styles.content}>•	Ứng dụng thanh toán và tương tác Yschool (“Yschool”): Là Ứng dụng mang tên Yschool do VNO là chủ sở hữu và cung cấp.</Text>
                    <Text style={styles.content}>•	Hệ thống: Bao gồm các máy chủ đặt tại trung tâm dữ liệu của VNO, được cài đặt các phần mềm hệ thống và phần mềm Yschool.</Text>
                    <Text style={styles.content}>•	Lệ phí/phí dịch vụ: là các khoản phát sinh trong quá trình sử dụng ứng dụng Yschool (nếu có).</Text>
                    <Text style={styles.content}>	•	Dịch vụ: là các dịch vụ mà ứng dụng Yschool cung cấp.</Text>
                    <Text style={styles.content}>	•	Khách hàng/Người dùng: Là các tổ chức (bao gồm trường học) và/hoặc cá nhân (bao gồm giáo viên, phụ huynh, học sinh, sinh viên) có nhu cầu sử dụng Yschool hoặc sử dụng một trong các ứng dụng/tính năng được phát triển bởi VNO dựa trên Yschool.</Text>
                    <Text style={styles.content}>	•	Các Bên: là các bên tham gia vào hệ thống Yschool, bao gồm nhưng không giới hạn: VNO và Khách hàng/Người dùng.</Text>
                    <Text style={styles.content}>	•	Tài khoản Yschool: là tài khoản mà người dùng thông qua đó sử dụng các dịch vụ trên ứng dụng Yschool.</Text>
                    <Text style={styles.content}>	•	Thông tin truy cập: là mật khẩu, thông tin đăng nhập chi tiết và bất kỳ thông tin bảo mật liên quan đến tài khoản Yschool của người dùng.</Text>
                    <Text style={styles.content}>	•	Pháp luật: là toàn bộ hệ thống luật của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, bao gồm bộ luật, luật và các văn bản dưới luật.</Text>
                    <Text style={styles.content}>	•	Ngày làm việc: là các ngày làm việc của VNO, từ 8h30 đến 18h00 từ thứ 2 đến thứ 6, ngoại trừ các ngày nghỉ, lễ, tết theo quy định của pháp luật.</Text>
                    {/* ------------------- Quyền sử dụng Yschool  -------------- */}
                    <Text style={styles.title}>•	Quyền sử dụng Yschool</Text>
                    <Text style={styles.content}>	•	Khách hàng có quyền sử dụng đầy đủ các tính năng của Yschool khi đăng ký sử dụng dịch vụ theo các chính sách được quy định của VNO.</Text>
                    <Text style={styles.content}>	•	Khách hàng KHÔNG được phép sử dụng dịch vụ Yschool cho những mục đích bao gồm nhưng không giới hạn: khai thác thông tin sản phẩm, hệ thống, truy xuất/cập nhật dữ liệu, gửi email, viết bài hoặc truyền tải dữ liệu để:</Text>
                    <Text style={styles.content}>	•	Làm tổn hại, làm phiền cho người khác hoặc gây ra thương tổn đến con người và tài sản;</Text>
                    <Text style={styles.content}>	•	Liên quan đến việc công bố các thông tin hoặc tài liệu lừa đảo, gây mất uy tín danh dự cho bất kỳ tổ chức, cá nhân nào, hoặc mang tính chất không lành mạnh bao gồm nhưng không giới hạn như: quấy rối, khiêu dâm, bạo lực, kinh dị, có nội dung vi phạm các chuẩn mực đạo đức của xã hội;</Text>
                    <Text style={styles.content}>	•	Xâm phạm các quyền riêng tư hoặc kì thị chủng tộc, chính trị, tôn giáo, quốc gia, vùng miền, giới tính, người tàn tật;</Text>
                    <Text style={styles.content}>	•	Xâm phạm quyền sở hữu trí tuệ hoặc các quyền sở hữu khác;</Text>
                    <Text style={styles.content}>	•	Cản trở hoặc phá hỏng Yschool (bao gồm nhưng không giới hạn bởi việc truy cập trái phép Yschool thông qua bất cứ phương tiện máy móc, phần mềm);</Text>
                    <Text style={styles.content}>	•	Vi phạm các quy định của pháp luật.</Text>
                    <Text style={styles.content}>Việc vi phạm các quy định nêu trên của Người dùng sẽ là cơ sở cho VNO được quyền đình chỉ, tạm khóa và/hoặc xóa bỏ tài khoản của Người dùng tại Yschool.</Text>
                    {/* ------------------- Chế độ phí và phương thức thanh toán  -------------- */}
                    <Text style={styles.title}>•	Chế độ phí và phương thức thanh toán</Text>
                    <Text style={styles.content}>Phí sử dụng dịch vụ Yschool và phương thức thanh toán được căn cứ theo biểu phí được VNO công bố cho từng thời kỳ.</Text>
                    {/* ------------------- Tài khoản Yschool của khách hàng   -------------- */}
                    <Text style={styles.title}>	•	Tài khoản Yschool của khách hàng</Text>
                    <Text style={styles.content}>	•	Trong quá trình đăng ký sử dụng Yschool, khách hàng sẽ tạo tài khoản và mật khẩu, đồng thời cung cấp một số thông tin của người dùng. Khách hàng đồng ý việc thu thập, ghi nhận, xử lý, lưu trữ, chia sẻ thông tin của người dùng theo quy định của Thỏa Thuận này nhằm phụ vụ cho các mục đích của ứng dụng Yschool.</Text>
                    <Text style={styles.content}>•	Khách hàng có trách nhiệm phải tự bảo mật mật khẩu và tài khoản của mình cũng như chịu trách nhiệm hoàn toàn về các hoạt động liên quan đến tài khoản của khách hàng. Với mỗi một tài khoản trong hệ thống Yschool, khách hàng là trường học có thể tạo các tài khoản riêng biệt cho giáo viên của trường học đó tham gia. Khách hàng tự trang bị đầy đủ, bảo dưỡng thường xuyên các thiết bị, máy móc kết nối phần mềm ứng dụng để đảm bảo kết nối và truy cập an toàn đến hệ thống Yschool.</Text>
                    <Text style={styles.content}>•	Khách hàng có trách nhiệm cung cấp các thông tin theo yêu cầu của Yschool để phục vụ cho việc định danh và thực hiện đúng trình tự, thủ tục các giao dịch thanh toán, các hướng dẫn an toàn bảo mật của ứng dụng Yschool và VNO. Khách hàng phải bảo đảm thoát/đăng xuất khỏi tài khoản của mình sau mỗi phiên sử dụng. Khách hàng thông báo ngay cho VNO khi phát hiện hoặc nghi ngờ có bất cứ ai sử dụng tài khoản và/hoặc mật khẩu của mình mà không được phép hay bất cứ lỗi bảo mật nào đối với hệ thống/ứng dụng Yschool. VNO không thể và sẽ không chịu trách nhiệm cho bất cứ sự mất mát, hư hỏng hay trách nhiệm nào khác nếu khách hàng không tuân thủ điều lệ này hay do sự truy cập trái phép vào tài khoản của khách hàng gây ra do lỗi của khách hàng.</Text>
                    <Text style={styles.content}>•	VNO không có trách nhiệm thực hiện lệnh thanh toán thông qua Yschool của Người dùng khi Người dùng không thực hiện đầy đủ các yêu cầu về thủ tục thanh toán, xác nhận thông tin thanh toán trên ứng dụng hoặc trong trường hợp tài khoản của Người dùng đã bị tạm khóa, đình chỉ, chấm dứt vì lý do bảo mật thông tin, khắc phục sự cố hoặc giải quyết tranh chấp phát sinh.</Text>
                    <Text style={styles.content}>•	Khách hàng phải thông báo kịp thời cho VNO khi phát hiện hoặc nghi ngờ có sai sót, nhầm lẫn trong giao dịch và/hoặc lộ, mất thông tin tài khoản người dùng.</Text>
                    <Text style={styles.content}>	•	Trong trường hợp có tranh chấp giữa hai hoặc nhiều bên về quyền sở hữu tài khoản, khách hàng đồng ý rằng VNO sẽ là bên duy nhất giải quyết tranh chấp đó và quyết định của VNO (có thể bao gồm việc chấm dứt hoặc đình chỉ tài khoản tranh chấp) là quyết định cuối cùng và có giá trị ràng buộc tất cả các bên.</Text>
                    <Text style={styles.content}>•	Khách hàng phải phối hợp cùng VNO giải quyết các vấn đề phát sinh trong quá trình sử dụng ứng dụng, bao gồm nhưng không giới hạn: cung cấp thông tin theo yêu cầu của VNO, tuân thủ theo các hướng dẫn khắc phục trong các trường hợp có sai sót từ Yschool, khắc phụ các sự cố và lỗi bảo mật, khôi phục tài khoản, thanh toán nhầm, thanh toán thiếu và thanh toán dư đối với các khoản chi phí mà người dùng đã thanh toán thông qua ứng dụng Yschool.</Text>
                    {/* ------------------- Tư vấn và hỗ trợ khách hàng   -------------- */}
                    <Text style={styles.title}>	•	Tư vấn và hỗ trợ khách hàng</Text>
                    <Text style={styles.content}>	•	VNO chịu trách nhiệm cung cấp dịch vụ tư vấn hỗ trợ cho khách hàng trong suốt quá trình sử dụng thông qua tổng đài tư vấn và hỗ trợ khách hàng 19006474, email support@yschool.vn, diễn đàn và các hình thức hỗ trợ khác được công bố tại website https://yschool.vn.</Text>
                    <Text style={styles.content}>	•	Khi sử dụng dịch vụ tư vấn qua tổng đài tư vấn và hỗ trợ khách hàng 19006474, khách hàng chấp nhận trả cước phí điện thoại theo quy định của nhà cung cấp dịch vụ viễn thông.</Text>
                    <Text style={styles.content}>	•	Các dịch vụ tư vấn hỗ trợ thông qua hình thức khác (như dịch vụ tư vấn hỗ trợ tại các địa điểm theo yêu cầu của khách hàng, dịch vụ tái đào tạo hướng dẫn sử dụng cho khách hàng) sẽ được hai bên thống nhất về chi phí và phương thức cung cấp bằng văn bản bổ sung khi có phát sinh yêu cầu.</Text>
                    {/* ------------------- Bảo hành, bảo trì   -------------- */}
                    <Text style={styles.title}>•	Bảo hành, bảo trì</Text>
                    <Text style={styles.content}>•	VNO chịu trách nhiệm đảm bảo điều kiện kỹ thuật để khách hàng có thể sử dụng Yschool 24h/ngày và 7 ngày/tuần ngoại trừ thời gian bảo trì, nâng cấp, khắc phục sự cố cho hệ thống. Thời gian ngưng hệ thống để bảo trì hoặc nâng cấp hoặc sao lưu sẽ được VNO báo trước lịch thực hiện cho khách hàng theo hình thức thông báo trực tiếp trên Yschool. Lịch bảo trì hoặc nâng cấp hoặc sao lưu sẽ thực hiện theo định kỳ hàng ngày hoặc hàng tuần hoặc hàng tháng hoặc hàng năm và ưu tiên vào buổi đêm khi hệ thống ít sử dụng nhất.</Text>
                    <Text style={styles.content}>	•	VNO có trách nhiệm tiến hành khắc phục sự cố của hệ thống nhanh nhất có thể kể từ khi tiếp nhận được yêu cầu từ khách hàng.</Text>
                    <Text style={styles.content}>	•	VNO có trách nhiệm cập nhật phiên bản mới nhất của Yschool cho khách hàng sử dụng.</Text>
                    <Text style={styles.content}>	•	Khách hàng đồng ý chấp nhận tất cả sự vá lỗi, sửa lỗi, nâng cấp, bảo trì cần thiết để các tính năng của Yschool hoạt động chính xác và đảm bảo tính bảo mật. Trừ trường hợp khẩn cấp, VNO sẽ thông báo trước tới khách hàng lịch trình của các hoạt động sửa lỗi, nâng cấp này.</Text>
                    {/* ------------------- Bảo mật   -------------- */}
                    <Text style={styles.title}>•	Bảo mật</Text>
                    <Text style={styles.content}>•	Dữ liệu của khách hàng là mọi thông tin mà khách hàng gửi, tải lên, truyền hoặc bằng bất kể phương thức nào giúp hiển thị thông tin đó trên trong khoản của khách hàng trên Yschool. Dữ liệu đó bao gồm nhưng không giới hạn: các dữ liệu thông tin định danh cần thiết mà Người dùng đã sử dụng đề đăng ký và sử dụng tài khoản Yschool, thông tin liên hệ của khách hàng, các số liệu tài khoản, các tin nhắn, các thông báo, các tập tin, các hình ảnh, các video, các ý kiến, các nhận xét, các đường dẫn, các nội dung liên quan đến công việc và tất cả mọi thông tin được hiển thị trên tài khoản Yschool của khách hàng; các giao dịch, thao tác, sửa đổi, bổ sung của người trong quá trình sử dụng Yschool. Khách hàng là chủ sở hữu và có toàn quyền kiểm soát về việc truy cập dữ liệu được đăng tải trên tài khoản/hệ thống Yschool của khách hàng.</Text>
                    <Text style={styles.content}>•	Khách hàng hiểu rằng VNO không sở hữu bất kì dữ liệu nào mà khách hàng đăng tải lên Yschool; trừ các tài liệu và hoặc giao diện hướng dẫn được VNO chủ động cung cấp công khai cho khách hàng.</Text>
                    <Text style={styles.content}>•	Việc quyết định đưa dữ liệu nào lên Yschool là toàn quyền của khách hàng. Tuy nhiên, những nội dung được quy định tại khoản 2.2 của Thỏa thuận sẽ không được phép đăng tải trên Yschool. VNO có toàn quyền vô hiệu hóa quyền truy cập vào nội dung dữ liệu của khách hàng nếu VNO xác định dữ liệu đó vi phạm điều khoản này, hoặc chúng tôi nhận được đơn khiếu nại từ các tài khoản, hoặc thông báo vi phạm sở hữu trí tuệ và/hoặc thông báo nội dung có dấu hiệu vi phạm pháp luật của các cơ quan có thẩm quyền.</Text>
                    <Text style={styles.content}>•	VNO chịu trách nhiệm thực hiện và duy trì tất cả các biện pháp bảo vệ mang tính hành chính, vật lý và kỹ thuật để bảo vệ cho tính bảo mật và toàn vẹn đối với dữ liệu khách hàng. VNO cam kết sẽ không:</Text>
                    <Text style={styles.content}>	•	Sửa đổi, xóa dữ liệu khách hàng mà không có sự đồng ý của khách hàng hoặc không phải vì mục đích khắc phục lỗi hay sự cố;</Text>
                    <Text style={styles.content}>	•	Không tiết lộ dữ liệu khách hàng trừ trường hợp phải tuân theo quy định của pháp luật hoặc được khách hàng cho phép;</Text>
                    <Text style={styles.content}>	•	Không truy cập vào dữ liệu và/hoặc làm thay đổi dữ liệu của khách hàng trừ trường hợp khắc phục lỗi kỹ thuật hoặc theo yêu cầu của khách hàng khi sử dụng dịch vụ hỗ trợ.</Text>
                    <Text style={styles.content}>•	VNO chịu trách nhiệm bảo mật mọi thông tin về dữ liệu của khách hàng và không được phép tiết lộ cho bất kỳ bên thứ ba nào khác ngoại trừ: yêu cầu của cơ quan có thẩm quyền của nhà nước; các đại lý, bên bán hàng, nhà cung cấp, nhà thầu, đối tác và các bên khác cung cấp dịch vụ cho VNO, thực hiện các chức năng thay mặt Công ty hoặc các bên hợp tác thương mại, cho hoặc liên quan đến các mục đích mà các bên thứ ba đó được thuê hoặc các mục đích hợp tác của VNO với các bên thứ ba đó (tùy từng trường hợp áp dụng). VNO không chịu trách nhiệm về các thất thoát dữ liệu, bí mật thông tin của khách hàng do khách hàng vô tình hoặc cố ý gây ra.</Text>
                    <Text style={styles.content}>	•	Khách hàng chịu trách nhiệm xác định và xác thực quyền của tất cả những người dùng truy nhập vào dữ liệu của khách hàng.</Text>
                    <Text style={styles.content}>	•	Khách hàng chịu trách nhiệm đảm bảo bí mật thông tin tài khoản khách hàng trên hệ thống Yschool.</Text>
                    <Text style={styles.content}>•	Khách hàng chịu trách nhiệm đối với toàn bộ các hoạt động thực hiện bởi các tài khoản của khách hàng và có trách nhiệm ngay lập tức thông báo với VNO về các truy cập trái phép vào tài khoản Yschool của khách hàng trong trường hợp phát hiện ra các truy cập trái phép đó.	</Text>
                    <Text style={styles.content}>•	VNO sẽ không chịu bất cứ trách nhiệm nào liên quan đến các tổn hại gây ra bởi khách hàng, bao gồm các cá nhân không có quyền truy cập vào Yschool vẫn có thể lấy được quyền truy cập do lỗi máy tính/ phần mềm hoặc hệ thống mạng nội bộ của khách hàng, không thuộc phạm vi quản lý của VNO.</Text>
                    <Text style={styles.content}>•	Trong phạm vi của Thỏa thuận này, “Thông tin bí mật” bao gồm: Dữ liệu của khách hàng cung cấp trong quá trình sử dụng Yschool, công nghệ độc quyền của mỗi bên, quy trình nghiệp vụ và các thông tin kỹ thuật của sản phẩm, thiết kế, và toàn bộ quá trình trao đổi giữa hai bên liên quan đến Yschool. Bất kể những điều đã đề cập ở trên, “Thông tin bí mật” không bao gồm các thông tin mà:</Text>
                    <Text style={styles.content}>•	Đã được biết tới rộng rãi trước khi tiết lộ;</Text>
                    <Text style={styles.content}>•	Được công chúng biết tới không phải do lỗi của bên nhận thông tin;</Text>
                    <Text style={styles.content}>•	Dữ liệu tổng hợp trong đó không chứa bất kỳ thông tin cá nhân hoặc thông tin nào cụ thể của khách hàng.</Text>
                    <Text style={styles.content}>•	Trừ trường hợp được quy định tại Khoản 7.5 trên, Khách hàng và VNO cùng thỏa thuận:</Text>
                    <Text style={styles.content}>•	Thực hiện các biện pháp cần thiết để giữ bí mật cho tất cả các “Thông tin bí mật”;</Text>
                    <Text style={styles.content}>•	Không sao chép, cung cấp một phần hay toàn bộ thông tin bảo mật cho bất kỳ bên thứ ba khi chưa có sự chấp thuận của bên có quyền sở hữu đối với “Thông tin bí mật”;</Text>
                    <Text style={styles.content}>•	Không sử dụng “Thông tin bí mật” mà các bên đã cung cấp cho nhau phục vụ cho các mục đích khác ngoài mục đích thực hiện Thỏa thuận này.</Text>
                    {/* ------------------- Bản quyền phần mềm và dữ liệu   -------------- */}
                    <Text style={styles.title}>•	Bản quyền phần mềm và dữ liệu</Text>
                    <Text style={styles.content}>•	VNO là chủ sở hữu và có toàn quyền tác giả đối với Yschool.</Text>
                    <Text style={styles.content}>•	Khách hàng có quyền sử dụng Yschool để tạo ra dữ liệu phục vụ công việc của đơn vị và có quyền tải về phần dữ liệu do chính đơn vị nhập vào hệ thống trong suốt thời gian được cấp phép sử dụng.</Text>
                    <Text style={styles.content}>•	Khách hàng đồng ý rằng sản phẩm/dịch vụ, bao gồm nhưng không giới hạn: giao diện người sử dụng, đoạn âm thanh, đoạn video, hình ảnh, logo, nội dung hướng dẫn sử dụng và phần mềm được sử dụng để thực hiện sản phẩm/dịch vụ liên quan đến Yschool thuộc sở hữu riêng của VNO được bảo hộ bởi pháp luật về sở hữu trí tuệ và quyền tác giả. Khách hàng cam kết sẽ không sử dụng các thông tin hoặc tài liệu thuộc sở hữu riêng đó theo bất cứ cách thức nào ngoại trừ cho mục đích sử dụng sản phẩm/dịch vụ theo Thỏa thuận này. Không có phần nào trong sản phẩm/dịch vụ có thể được sao chép lại dưới bất kỳ hình thức nào hoặc bằng bất cứ phương tiện nào, trừ khi được cho phép một cách rõ ràng theo các điều khoản này.</Text>
                    <Text style={styles.content}>•	Khách hàng đồng ý không sửa đổi, thuê, cho thuê, cho vay, bán, phân phối, cầm cố, thế chấp hoặc tạo ra các sản phẩm phát sinh dựa trên sản phẩm/dịch vụ theo bất cứ phương cách nào, và không khai thác sản phẩm/dịch vụ theo bất cứ phương thức không được phép nào, bao gồm nhưng không giới hạn ở việc xâm phạm hoặc tạo gánh nặng lên dung lượng của hệ thống mạng của VNO.</Text>
                    <Text style={styles.content}>•	Việc sử dụng Yschool và/hoặc bất cứ phần nào của sản phẩm/dịch vụ liên quan đến Yschool như đã nêu trên, trừ khi việc sử dụng Yschool và/hoặc sản phẩm/dịch vụ đó như được cho phép theo Thỏa thuận này, đều bị nghiêm cấm và được coi là xâm phạm đến các quyền sở hữu trí tuệ và quyền tác giả, và khách hàng có thể phải chịu các hình phạt dân sự và hình sự, bao gồm cả việc bồi thường thiệt hại bằng tiền có thể được áp dụng đối với việc xâm phạm quyền sở hữu trí tuệ và quyền tác giả.</Text>
                    <Text style={styles.content}>•	Để VNO có thể cung cấp dịch vụ sử dụng Yschool cho khách hàng, khách hàng đồng ý cho VNO quyền xử lý và truyền tải dữ liệu của khách hàng. VNO có quyền nhưng không có nghĩa vụ nào trong việc thực hiện các hành động khắc phục nếu như có bất cứ nội dung nào mà khách hàng vi phạm các điều khoản được liệt kê trong Thỏa thuận này. VNO không có bất kỳ trách nhiệm pháp lý nào đối với khách hàng trong các tình huống VNO thực hiện hành động khắc phục. Khách hàng là người duy nhất chịu trách nhiệm về tính chính xác, chất lượng, tính toàn vẹn, hợp pháp, tin cậy và phù hợp đối với tất cả dữ liệu của mình.</Text>
                    <Text style={styles.content}>•	VNO có thể đề nghị và khách hàng có thể lựa chọn đồng ý sử dụng các tính năng chưa được phát hành rộng rãi và chưa được kiểm duyệt hoàn toàn về mặt chất lượng theo quy trình của VNO (chức năng Beta). Mục đích của việc này là để khách hàng kiểm duyệt và cung cấp phản hồi cho VNO. Khách hàng hoàn toàn chịu trách nhiệm về những rủi ro khi sử dụng các chức năng này. VNO không đảm bảo về tính đúng đắn, đầy đủ của các chức năng Beta cũng như không chịu trách nhiệm cho các lỗi sai hoặc thiệt hại gây ra do việc sử dụng các chức năng Beta.</Text>
                    {/* ------------------- Thông tin/ thông báo   -------------- */}
                    <Text style={styles.title}>•	 Thông tin/ thông báo</Text>
                    <Text style={styles.content}>Trong quá trình sử dụng, khách hàng đồng ý nhận các thông tin/thông báo do VNO gửi với nội dung và phương thức như sau:</Text>
                    <Text style={styles.content}>•	Nội dung các thông báo bao gồm nhưng không giới hạn bởi các loại thông tin như sau:</Text>
                    <Text style={styles.content}>•	Thông tin về các tính năng mới của sản phẩm;</Text>
                    <Text style={styles.content}>•	Thông tin về các phiên bản mới của sản phẩm;</Text>
                    <Text style={styles.content}>•	Thông tin về các sản phẩm có liên quan;</Text>
                    <Text style={styles.content}>•	Thông tin về nội dung các bài báo hoặc bản tin mà VNO cho rằng có thể hữu ích cho khách hàng trong quá trình hoạt động.</Text>
                    <Text style={styles.content}>•	Phương thức gửi thông báo bao gồm nhưng không giới hạn bởi các hình thức sau:</Text>
                    <Text style={styles.content}>•	Thông báo trực tiếp trên màn hình sản phẩm;</Text>
                    <Text style={styles.content}>•	Thông báo qua email;</Text>
                    <Text style={styles.content}>•	Thông báo qua tin nhắn trên điện thoại di động;</Text>
                    <Text style={styles.content}>•	Thông báo qua điện thoại;</Text>
                    <Text style={styles.content}>•	Thông báo qua văn bản;</Text>
                    <Text style={styles.content}>•	Thông báo bằng cách gặp trao đổi trực tiếp;</Text>
                    <Text style={styles.content}>•	Các hình thức thông báo khác.</Text>
                    {/* ------------------- Giới hạn trách nhiệm pháp lý và thực hiện dịch vụ   -------------- */}
                    <Text style={styles.title}>•	 Giới hạn trách nhiệm pháp lý và thực hiện dịch vụ</Text>
                    <Text style={styles.content}>•	VNO không cam đoan, tuyên bố, hoặc bảo đảm rằng việc khách hàng sử dụng sản phẩm/dịch vụ Yschool của VNO sẽ không bị gián đoạn hoặc không bị lỗi, hoặc sản phẩm/dịch vụ sẽ đáp ứng yêu cầu khách hàng hoặc tất cả các lỗi trên phần mềm và/hoặc tài liệu sẽ được sửa hoặc hệ thống tổng thể đảm bảo hoạt động của sản phẩm/dịch vụ Yschool (bao gồm nhưng không giới hạn: mạng internet, các mạng truyền dẫn khác, mạng nội bộ và các thiết bị của khách hàng) sẽ không có virus hoặc không có thành phần gây hại.</Text>
                    <Text style={styles.content}>•	VNO không đảm bảo dưới bất kỳ hình thức nào, dù rõ ràng hay ngầm định về các điều kiện như sự thỏa mãn về chất lượng, phù hợp cho nhu cầu sử dụng đặc thù hoặc không xâm phạm các quyền của bên thứ ba. Dịch vụ của VNO được cung cấp cho khách hàng dưới dạng “theo hiện trạng - as is” và “có sẵn - as available” cho khách hàng sử dụng. Khách hàng sẽ chịu toàn bộ trách nhiệm trong việc xác định xem sản phẩm/dịch vụ Yschool hoặc thông tin được tạo ra từ sản phẩm/dịch vụ Yschool là đúng đắn và đáp ứng đầy đủ cho mục đích sử dụng của khách hàng.</Text>
                    <Text style={styles.content}>•	Trong bất cứ trường hợp nào VNO đều không chịu trách nhiệm về bất kỳ các thiệt hại nào trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính chất trừng phạt, bao gồm nhưng không giới hạn ở các thiệt hại do mất doanh thu, lợi nhuận, lợi thế kinh doanh, ngừng việc, mất mát dữ liệu do hậu quả của:</Text>
                    <Text style={styles.content}>	•	Việc sử dụng hoặc không thể sử dụng sản phẩm/dịch vụ Yschool;</Text>
                    <Text style={styles.content}>•	Bất kỳ các thay đổi nào được thực hiện đối với sản phẩm/dịch vụ Yschool;</Text>
                    <Text style={styles.content}>•	Truy cập trái phép hoặc biến đổi trái phép các dữ liệu;</Text>
                    <Text style={styles.content}>•	Xóa, sai hỏng, hoặc không lưu trữ dữ liệu có trên hoặc thông qua sản phẩm/dịch vụ Yschool;</Text>
                    <Text style={styles.content}>•	Các tuyên bố hay hành vi của bất kỳ bên thứ ba nào đối với sản phẩm/dịch vụ Yschool;</Text>
                    <Text style={styles.content}>•	Bất kỳ vấn đề nào khác liên quan đến sản phẩm/dịch vụ Yschool.</Text>
                    <Text style={styles.content}>•	VNO được miễn trách nhiệm thực hiện nghĩa vụ được nêu trong Thỏa thuận này đối với các trường hợp bất khả kháng ghi trong Thỏa thuận này.</Text>
                    {/* ------------------- Trách nhiệm xử lý sự cố an ninh   -------------- */}
                    <Text style={styles.title}>•	Trách nhiệm xử lý sự cố an ninh</Text>
                    <Text style={styles.content}>•	Trong trường hợp khách hàng phát hiện ra các sự cố an ninh của Yschool, khách hàng có trách nhiệm thông báo ngay với VNO bằng cách ấn nút Phản hồi ngay trên giao diện sản phẩm hoặc gọi điện đến tổng đài 19006474. Các sự cố an ninh phần mềm bao gồm nhưng không giới hạn bởi các trường hợp sau:</Text>
                    <Text style={styles.content}>•	Bị mất hoặc thay đổi dữ liệu trên phần mềm mà không biết nguyên nhân;</Text>
                    <Text style={styles.content}>•	Bị gián đoạn không sử dụng được sản phẩm;</Text>
                    <Text style={styles.content}>•	Nghi ngờ bị hacker tấn công.</Text>
                    <Text style={styles.content}>•	Khi xảy ra sự cố an ninh thông tin liên quan đến Yschool, VNO sẽ có trách nhiệm tổ chức điều tra để xử lý sự cố và khôi phục hoạt động cho khách hàng trong thời gian sớm nhất có thể. Trong quá trình điều tra và khắc phục sự cố, khách hàng phải có trách nhiệm tham gia, hỗ trợ nếu VNO có yêu cầu.</Text>
                    {/* ------------------- Bất khả kháng   -------------- */}
                    <Text style={styles.title}>•	Bất khả kháng</Text>
                    <Text style={styles.content}>•	Trong trường hợp bất khả kháng, không bên nào bị xem là có lỗi và chịu trách nhiệm bồi thường với bên còn lại nếu không thực hiện hoặc thực hiện không đúng, không đầy đủ các nghĩa vụ và trách nhiệm của mình được quy định trong Thỏa thuận này mà nguyên nhân của việc không thực hiện, thực hiện không đúng, không đủ này có nguyên nhân từ sự kiện bất khả kháng. Hai bên nhất trí coi các trường hợp sau là bất khả kháng:</Text>
                    <Text style={styles.content}>•	Thiên tai, địch họa gây cách trở hoặc phá hủy hoặc tắc nghẽn hoặc dừng kết nối đến trung tâm dữ liệu của VNO.</Text>
                    <Text style={styles.content}>•	 Sự cố mất điện trên diện rộng; Sự cố đứt cáp viễn thông gây tắc nghẽn hoặc ngừng kết nối viễn thông, Internet đến trung tâm dữ liệu của VNO.</Text>
                    <Text style={styles.content}>•	Tin tặc (hacker), vi rút máy tính (virus) tấn công vào trung tâm dữ liệu của VNO làm ngừng trệ, tắc nghẽn hoặc phá hủy phần mềm và dữ liệu.</Text>
                    <Text style={styles.content}>•	Các sự cố bất khả kháng khác theo quy định của pháp luật.</Text>
                    <Text style={styles.content}>•	Các bên thống nhất với nhau rằng, trong trường hợp bất khả kháng xảy ra, các bên sẽ cùng nhau phối hợp và/hoặc trong phạm vi khả năng hết mức của mình, tiến hành thông báo cho bên còn lại về sự cố phát sinh do tình huống bất khả kháng, thực hiện các biện pháp khắc phục, sửa chữa các sự cố, gián đoạn. Đồng thời, các bên phải ngay lập tức thực hiện tiếp tục các trách nhiệm và nghĩa vụ của mình theo Thỏa thuận ngay khi sự kiện bất khả kháng không còn.</Text>
                    <Text style={styles.title}>	•	Tạm ngừng và chấm dứt thỏa thuận</Text>
                    <Text style={styles.content}>•	 VNO có quyền tạm khóa tài khoản/tạm ngừng việc sử dụng của khách hàng đối với dịch vụ và có thể mở tạm ngừng khi khách hàng chấm dứt hoặc cam kết chấm dứt các hành vi vi phạm trong các trường hợp sau:</Text>
                    <Text style={styles.content}>•	Khách hàng không thực hiện việc đăng ký gia hạn và thanh toán các khoản chi phí sử dụng Yschool sau khi quá hạn; Thời gian thanh toán được VNO thông báo theo từng thời kỳ.</Text>
                    <Text style={styles.content}>•	VNO cho rằng Yschool đang được khách hàng sử dụng để tham gia vào các cuộc tấn công từ chối dịch vụ, gửi thư rác, các hoạt động bất hợp pháp hoặc việc sử dụng sản phẩm/dịch vụ của khách hàng gây nguy hại tới VNO và những cá nhân/tổ chức khác.</Text>
                    <Text style={styles.content}>	•	Khách hàng có các hành vi nêu tại khoản 2.2 của Thỏa thuận.</Text>
                    <Text style={styles.content}>•	Tài khoản của khách hàng xảy ra sự cố như tại quy định của khoản 4.3 và khoản 4.4 mà VNO cần có thời gian khắc phục, việc tạm khóa tài khoản nhằm đảm bảo  tài khoản của khách hàng trước sự đăng nhập trái phép từ bên thứ ba. VNO sẽ mở tạm khóa khi lỗi bảo mật được khắc phục hoàn toàn.</Text>
                    <Text style={styles.content}>•	Thỏa thuận được coi như chấm dứt trong các trường hợp sau:</Text>
                    <Text style={styles.content}>•	VNO đơn phương chấm dứt thỏa thuận do khách hàng không thực hiện nghĩa vụ thanh toán cho VNO theo thỏa thuận giữa hai bên;</Text>
                    <Text style={styles.content}>•	VNO đơn phương chấm dứt khi khách hàng không chấm dứt, khắc phục, tiêu hủy các dữ liệu và hành vi vi phạm được nêu tại khoản 13.1b và 13.1c trong thời hạn 07 ngày làm việc sau khi bị VNO tạm ngưng, hoặc khách hàng vẫn tái phạm sau khi VNO đã mở tạm ngưng.</Text>
                    <Text style={styles.content}>	•	VNO đơn phương chấm dứt thỏa thuận theo yêu cầu của tòa án và cơ quan có thẩm quyền của nhà nước;</Text>
                    <Text style={styles.content}>•	Khách hàng gửi thông báo yêu cầu chấm dứt thỏa thuận cho VNO bằng văn bản.</Text>
                    <Text style={styles.content}>•	VNO không có nghĩa vụ hoàn trả bất kể chi phí nào mà khách hàng đã thanh toán cho các dịch vụ đã sử dụng từ Yschool trong trường hợp chấm dứt thỏa thuận vì những lý do đã nêu trên. VNO chỉ chịu trách nhiệm bảo đảm duy trì dữ liệu của khách hàng trên hệ thống tối đa là 90 ngày kể từ ngày chấm dứt thỏa thuận.</Text>
                    {/* ------------------- Căn cứ pháp lý   -------------- */}
                    <Text style={styles.title}>•	Căn cứ pháp lý</Text>
                    <Text style={styles.content}>Căn cứ Bộ luật dân sự số 91/2015/QH13;</Text>
                    <Text style={styles.content}>Căn cứ Luật thương mại số 36/2005/QH11;</Text>
                    <Text style={styles.content}>Căn cứ Luật Công nghệ thông tin số 67/2006/QH11;</Text>
                    <Text style={styles.content}>Căn cứ vào nhu cầu của hai bên.</Text>
                    {/* ------------------- Điều khoản chung   -------------- */}
                    <Text style={styles.title}>	•	 Điều khoản chung</Text>
                    <Text style={styles.content}>	•	Khi chưa có đồng ý bằng văn bản của VNO, khách hàng không được quyền chuyển nhượng bất cứ quyền và nghĩa vụ nào của khách hàng đã được xác định trong bản Thoả thuận này.</Text>
                    <Text style={styles.content}>	•	Thoả Thuận này được điều chỉnh theo pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam.</Text>
                    <Text style={styles.content}>	•	Mọi tranh chấp, bất đồng phát sinh từ, và/hoặc liên quan đến việc sử dụng Yschool theo Thỏa thuận này, các Bên cùng nhau bàn bạc giải quyết trên cơ sở thương lượng đảm bảo các Bên cùng có lợi. Nếu không giải quyết được bằng thương lượng, các Bên thống nhất tranh chấp hoặc bất đồng đó sẽ được giải quyết tại quyết tại toà án nhân dân có thẩm quyền. Quyết định của Toà án có giá trị ràng buộc các Bên thi hành. Trong thời gian toà án chưa ra phán quyết, các Bên vẫn phải tiếp tục thực hiện nghĩa vụ và trách nhiệm của mỗi Bên theo quy định của Thoả Thuận này. Các chi phí liên quan đến việc giải quyết tranh chấp do Bên thua kiện theo phán quyết của toà án phải chịu.</Text>

                </ScrollView>
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <ButtonCom
                        onPress={this._submit}
                        style={{ marginTop: 5, backgroundColor: colors.colorPink }}
                        text={"XÁC NHẬN"}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        marginTop: 50,
        marginHorizontal: 50,
        fontWeight: '800',
        color: colors.colorGreenThere1
    },
    title: {
        textAlign: 'left',
        marginTop: 20,
        marginHorizontal: 20,
        fontWeight: '600'
    },
    content: {
        textAlign: 'justify',
        marginTop: 10,
        marginHorizontal: 30
    }
})

export default Utils.connectRedux(ThoaThuanNguoiDung, null, false);
