import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';

/// Figma: Chat - 1:1 채팅방
/// - AppBar "Sarah" + 더보기
/// - 날짜 구분선 "2026. 12. 23 월"
/// - 상대 메시지 (회색 버블, 왼쪽 정렬)
/// - 내 메시지 (녹색 버블, 오른쪽 정렬)
/// - 행아웃 약속 카드 (날짜/시간/장소 + 장소 보기/수정하기)
/// - 안전 안내 배너
/// - 입력 필드 + 전송 버튼
class ChatRoomScreen extends StatefulWidget {
  final String chatId;

  const ChatRoomScreen({super.key, required this.chatId});

  @override
  State<ChatRoomScreen> createState() => _ChatRoomScreenState();
}

class _ChatRoomScreenState extends State<ChatRoomScreen> {
  final _messageController = TextEditingController();
  bool _showAttachMenu = false;

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: HangkoAppBar(
        title: 'Sarah',
        actions: [
          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          // 메시지 리스트
          Expanded(
            child: ListView(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              children: [
                // 날짜 구분
                _dateDivider('2026. 12. 23 월'),
                SizedBox(height: 16.h),
                // 상대 메시지
                _otherMessage(
                  '안녕하세요! 다음 주에 서울을 방문할 예정입니다. 강남 같이 가 주실래요?',
                  '오전 10:24',
                ),
                SizedBox(height: 12.h),
                // 내 메시지
                _myMessage(
                  'Sure, I\'ll go with you! Is there anything you want to see in Gangnam?',
                  '오전 10:30',
                ),
                SizedBox(height: 16.h),
                // 행아웃 약속 카드
                _appointmentCard(),
                SizedBox(height: 16.h),
                // 안전 안내
                _safetyBanner(),
                SizedBox(height: 12.h),
                // 상대 타이핑 중
                _typingIndicator(),
              ],
            ),
          ),
          // 첨부 메뉴
          if (_showAttachMenu) _attachMenu(),
          // 입력 필드
          _inputBar(),
        ],
      ),
    );
  }

  Widget _dateDivider(String date) {
    return Center(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 6.h),
        decoration: BoxDecoration(
          color: const Color(0xFFF3F4F6),
          borderRadius: BorderRadius.circular(16.r),
        ),
        child: Text(
          date,
          style: TextStyle(fontSize: 12.sp, color: const Color(0xFF9CA3AF)),
        ),
      ),
    );
  }

  Widget _otherMessage(String text, String time) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(
          radius: 16.r,
          backgroundColor: const Color(0xFFE5E7EB),
          child: Icon(Icons.person, size: 16.r, color: const Color(0xFF9CA3AF)),
        ),
        SizedBox(width: 8.w),
        Flexible(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: EdgeInsets.all(12.w),
                decoration: BoxDecoration(
                  color: const Color(0xFFF3F4F6),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(4.r),
                    topRight: Radius.circular(16.r),
                    bottomLeft: Radius.circular(16.r),
                    bottomRight: Radius.circular(16.r),
                  ),
                ),
                child: Text(
                  text,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: const Color(0xFF1A1A1A),
                    height: 1.4,
                  ),
                ),
              ),
              SizedBox(height: 4.h),
              Text(time,
                  style: TextStyle(
                      fontSize: 11.sp, color: const Color(0xFF9CA3AF))),
            ],
          ),
        ),
        SizedBox(width: 60.w),
      ],
    );
  }

  Widget _myMessage(String text, String time) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        SizedBox(width: 60.w),
        Flexible(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: EdgeInsets.all(12.w),
                decoration: BoxDecoration(
                  color: const Color(0xFFE8F5E9),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(16.r),
                    topRight: Radius.circular(4.r),
                    bottomLeft: Radius.circular(16.r),
                    bottomRight: Radius.circular(16.r),
                  ),
                ),
                child: Text(
                  text,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: const Color(0xFF1A1A1A),
                    height: 1.4,
                  ),
                ),
              ),
              SizedBox(height: 4.h),
              Text(time,
                  style: TextStyle(
                      fontSize: 11.sp, color: const Color(0xFF9CA3AF))),
            ],
          ),
        ),
      ],
    );
  }

  Widget _appointmentCard() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20.w),
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: const Color(0xFFE5E7EB)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '행아웃 약속을 만들었어요.',
            style: TextStyle(
              fontSize: 15.sp,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF1A1A1A),
            ),
          ),
          SizedBox(height: 12.h),
          _infoRow('날짜', '2025.12.01(월)'),
          SizedBox(height: 4.h),
          _infoRow('시간', '13:00'),
          SizedBox(height: 4.h),
          _infoRow('장소', '강남역 8번 출구'),
          SizedBox(height: 16.h),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF1A1A1A),
                    side: const BorderSide(color: Color(0xFFE5E7EB)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                  ),
                  child: const Text('장소 보기'),
                ),
              ),
              SizedBox(width: 8.w),
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF1A1A1A),
                    side: const BorderSide(color: Color(0xFFE5E7EB)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                  ),
                  child: const Text('수정하기'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Row(
      children: [
        Text(
          '$label: ',
          style: TextStyle(
            fontSize: 13.sp,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF374151),
          ),
        ),
        Text(
          value,
          style: TextStyle(fontSize: 13.sp, color: const Color(0xFF374151)),
        ),
      ],
    );
  }

  Widget _safetyBanner() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 8.w),
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: const Color(0xFFE8F5E9),
        borderRadius: BorderRadius.circular(12.r),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.info_outline, size: 18.r, color: const Color(0xFF4CAF50)),
          SizedBox(width: 8.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '안전한 만남을 위한 안내',
                  style: TextStyle(
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF1A1A1A),
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  '되도록 번화가나 공공장소에서 만나시기를 권장해요.\n첫 만남은 카페, 레스토랑 등 사람이 많은 곳에서 진행해주세요.',
                  style: TextStyle(
                    fontSize: 12.sp,
                    color: const Color(0xFF6B7280),
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _typingIndicator() {
    return Row(
      children: [
        CircleAvatar(
          radius: 16.r,
          backgroundColor: const Color(0xFFE5E7EB),
          child: Icon(Icons.person, size: 16.r, color: const Color(0xFF9CA3AF)),
        ),
        SizedBox(width: 8.w),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),
          decoration: BoxDecoration(
            color: const Color(0xFFF3F4F6),
            borderRadius: BorderRadius.circular(16.r),
          ),
          child: Text('•  •  •',
              style: TextStyle(
                  fontSize: 16.sp, color: const Color(0xFF9CA3AF))),
        ),
      ],
    );
  }

  Widget _attachMenu() {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 16.h),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Color(0xFFF3F4F6))),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _attachItem(Icons.photo_library_outlined, '사진'),
          _attachItem(Icons.camera_alt_outlined, '카메라'),
          _attachItem(Icons.location_on_outlined, '장소'),
          _attachItem(Icons.calendar_today_outlined, '약속'),
        ],
      ),
    );
  }

  Widget _attachItem(IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 48.r,
          height: 48.r,
          decoration: BoxDecoration(
            color: const Color(0xFFF3F4F6),
            borderRadius: BorderRadius.circular(12.r),
          ),
          child: Icon(icon, size: 24.r, color: const Color(0xFF374151)),
        ),
        SizedBox(height: 6.h),
        Text(label,
            style: TextStyle(fontSize: 11.sp, color: const Color(0xFF6B7280))),
      ],
    );
  }

  Widget _inputBar() {
    return SafeArea(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: Color(0xFFF3F4F6))),
        ),
        child: Row(
          children: [
            GestureDetector(
              onTap: () => setState(() => _showAttachMenu = !_showAttachMenu),
              child: Icon(Icons.add, size: 24.r, color: const Color(0xFF9CA3AF)),
            ),
            SizedBox(width: 8.w),
            Expanded(
              child: Container(
                height: 40.h,
                padding: EdgeInsets.symmetric(horizontal: 12.w),
                decoration: BoxDecoration(
                  color: const Color(0xFFF3F4F6),
                  borderRadius: BorderRadius.circular(20.r),
                ),
                child: TextField(
                  controller: _messageController,
                  decoration: InputDecoration(
                    hintText: '메시지를 입력하세요...',
                    hintStyle: TextStyle(
                        fontSize: 14.sp, color: const Color(0xFF9CA3AF)),
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(vertical: 10.h),
                  ),
                ),
              ),
            ),
            SizedBox(width: 8.w),
            GestureDetector(
              onTap: () {},
              child: Icon(Icons.send, size: 24.r,
                  color: const Color(0xFF4CAF50)),
            ),
          ],
        ),
      ),
    );
  }
}
