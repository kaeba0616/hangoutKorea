import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_search_bar.dart';

/// Figma: Chat-1 - 채팅 리스트
/// - AppBar "채팅" + 더보기
/// - 검색바
/// - "대화 중인 채팅" 섹션 (아바타 + 이름 + 마지막 메시지 + 시간 + 읽지않은 수)
/// - "나를 기다리는 채팅" 섹션
/// - Bottom Navigation (채팅/매칭/커뮤니티/프로필)
class ChatListScreen extends StatelessWidget {
  const ChatListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: HangkoAppBar(
        title: '채팅',
        showBackButton: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.more_vert),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 검색바
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              child: const HangkoSearchBar(hintText: '검색'),
            ),
            SizedBox(height: 8.h),
            // 대화 중인 채팅
            _sectionHeader('대화 중인 채팅'),
            _ChatItem(
              name: 'William Johnson',
              message: '내일 경복궁 가는 거 맞죠? 시간은 어떻...',
              time: '오전 9:30',
              unreadCount: 999,
              isOnline: true,
              onTap: () => context.push('/chat/room/william'),
            ),
            _ChatItem(
              name: '강은찬',
              message: '아이스 아메리카노 먹는 민족',
              time: '오전 9:30',
              unreadCount: 0,
              isOnline: true,
              onTap: () => context.push('/chat/room/eunchan'),
            ),
            _ChatItem(
              name: '최지우, 하은미',
              message: '몇 시에 출발??',
              time: '',
              unreadCount: 24,
              isOnline: false,
              onTap: () => context.push('/chat/room/group1'),
            ),
            _ChatItem(
              name: '김민재',
              message: '행코씨가 서 오세요ㅎ',
              time: '',
              unreadCount: 3,
              isOnline: true,
              onTap: () => context.push('/chat/room/minjae'),
            ),
            SizedBox(height: 16.h),
            // 나를 기다리는 채팅
            _sectionHeader('나를 기다리는 채팅'),
            _ChatItem(
              name: 'Emily Scott',
              message: '안녕하세요~',
              time: '',
              unreadCount: 2,
              isOnline: false,
              isWaiting: true,
              onTap: () => context.push('/chat/room/emily'),
            ),
            _ChatItem(
              name: 'Andrew Hill',
              message: 'Hi :)',
              time: '오전 2:30',
              unreadCount: 1,
              isOnline: false,
              isWaiting: true,
              onTap: () => context.push('/chat/room/andrew'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: EdgeInsets.fromLTRB(16.w, 8.h, 16.w, 8.h),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 13.sp,
          fontWeight: FontWeight.w500,
          color: const Color(0xFF9CA3AF),
        ),
      ),
    );
  }
}

class _ChatItem extends StatelessWidget {
  final String name;
  final String message;
  final String time;
  final int unreadCount;
  final bool isOnline;
  final bool isWaiting;
  final VoidCallback? onTap;

  const _ChatItem({
    required this.name,
    required this.message,
    required this.time,
    required this.unreadCount,
    this.isOnline = false,
    this.isWaiting = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
        child: Row(
          children: [
            // 아바타 + 온라인 표시
            Stack(
              children: [
                CircleAvatar(
                  radius: 24.r,
                  backgroundColor: const Color(0xFFE5E7EB),
                  child: Icon(Icons.person, size: 24.r,
                      color: const Color(0xFF9CA3AF)),
                ),
                if (isOnline)
                  Positioned(
                    right: 0,
                    bottom: 0,
                    child: Container(
                      width: 12.r,
                      height: 12.r,
                      decoration: BoxDecoration(
                        color: const Color(0xFF4CAF50),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 2),
                      ),
                    ),
                  ),
              ],
            ),
            SizedBox(width: 12.w),
            // 이름 + 메시지
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: TextStyle(
                      fontSize: 15.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 2.h),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 13.sp,
                      color: const Color(0xFF9CA3AF),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            // 시간 + 읽지않은 수
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                if (time.isNotEmpty)
                  Text(
                    time,
                    style: TextStyle(
                      fontSize: 11.sp,
                      color: const Color(0xFF9CA3AF),
                    ),
                  ),
                if (unreadCount > 0) ...[
                  SizedBox(height: 4.h),
                  Container(
                    padding: EdgeInsets.symmetric(
                        horizontal: 6.w, vertical: 2.h),
                    decoration: BoxDecoration(
                      color: const Color(0xFF4CAF50),
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    child: Text(
                      unreadCount > 999 ? '999+' : '$unreadCount',
                      style: TextStyle(
                        fontSize: 11.sp,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}
