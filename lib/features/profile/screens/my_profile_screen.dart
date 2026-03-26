import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/profile_header.dart';

/// Figma: profile (3007:4919)
/// - AppBar "프로필" + 메뉴 아이콘
/// - ProfileHeader (80x80 avatar, username, verified, details, following/followers)
/// - LanguageLevel chips + Description
/// - "프로필 편집" 버튼
/// - Tabs (캘린더 / 후기)
/// - 캘린더: ModalDate picker
/// - 최근 일정: Event list
/// - 행아웃 후기: 리뷰 리스트 (아바타 + 이름 + 날짜 + 텍스트 + 이미지)
/// - Bottom Navigation
class MyProfileScreen extends StatelessWidget {
  const MyProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: HangkoAppBar(
        title: '프로필',
        showBackButton: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: () => context.push('/profile/me/menu'),
          ),
        ],
      ),
      body: DefaultTabController(
        length: 2,
        child: NestedScrollView(
          headerSliverBuilder: (context, innerBoxIsScrolled) => [
            SliverToBoxAdapter(
              child: Column(
                children: [
                  // Profile Header
                  ProfileHeader(
                    username: '행아코',
                    details: '25세 · Female · 🇺🇸 USA',
                    isVerified: true,
                    followingCount: 128,
                    followersCount: 256,
                    languages: const [
                      (language: '한국어', level: '상급'),
                      (language: '영어', level: '원어민'),
                    ],
                    description:
                        '안녕하세요! 한국에서 새로운 친구를 만들고 싶어요. 서울에서 같이 맛집 탐방하실 분!',
                    onFollowingTap: () =>
                        context.push('/profile/me/following'),
                    onFollowersTap: () =>
                        context.push('/profile/me/followers'),
                  ),
                  SizedBox(height: 12.h),
                  // 프로필 편집 버튼
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16.w),
                    child: OutlinedButton(
                      onPressed: () => context.push('/profile/me/edit'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF1A1A1A),
                        side: const BorderSide(color: Color(0xFFE5E7EB)),
                        minimumSize: Size(343.w, 44.h),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.r),
                        ),
                      ),
                      child: const Text('프로필 편집'),
                    ),
                  ),
                  SizedBox(height: 16.h),
                ],
              ),
            ),
            // Tabs
            SliverPersistentHeader(
              pinned: true,
              delegate: _TabBarDelegate(
                TabBar(
                  labelColor: const Color(0xFF1A1A1A),
                  unselectedLabelColor: const Color(0xFF9CA3AF),
                  indicatorColor: const Color(0xFF1A1A1A),
                  indicatorWeight: 2,
                  labelStyle: TextStyle(
                      fontSize: 15.sp, fontWeight: FontWeight.w600),
                  unselectedLabelStyle: TextStyle(
                      fontSize: 15.sp, fontWeight: FontWeight.w400),
                  tabs: const [
                    Tab(text: '캘린더'),
                    Tab(text: '후기'),
                  ],
                ),
              ),
            ),
          ],
          body: TabBarView(
            children: [
              // 캘린더 탭
              _CalendarTab(),
              // 후기 탭
              _ReviewTab(userId: 'me'),
            ],
          ),
        ),
      ),
      // Bottom Navigation
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 3,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF1A1A1A),
        unselectedItemColor: const Color(0xFF9CA3AF),
        backgroundColor: Colors.white,
        elevation: 0,
        selectedFontSize: 11.sp,
        unselectedFontSize: 11.sp,
        items: const [
          BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined), label: '홈'),
          BottomNavigationBarItem(
              icon: Icon(Icons.search), label: '검색'),
          BottomNavigationBarItem(
              icon: Icon(Icons.chat_bubble_outline), label: '채팅'),
          BottomNavigationBarItem(
              icon: Icon(Icons.person_outline), label: '프로필'),
        ],
      ),
    );
  }
}

/// 탭바 delegate for SliverPersistentHeader
class _TabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;

  _TabBarDelegate(this.tabBar);

  @override
  double get minExtent => tabBar.preferredSize.height;

  @override
  double get maxExtent => tabBar.preferredSize.height;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(color: Colors.white, child: tabBar);
  }

  @override
  bool shouldRebuild(covariant _TabBarDelegate oldDelegate) => false;
}

/// 캘린더 탭: 월간 캘린더 + 최근 일정
class _CalendarTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 월간 캘린더
          _MonthCalendar(year: now.year, month: now.month),
          const Divider(height: 1, color: Color(0xFFF3F4F6)),
          // 최근 일정 섹션
          Padding(
            padding: EdgeInsets.all(16.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '최근 일정',
                  style: TextStyle(
                    fontSize: 17.sp,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF1A1A1A),
                  ),
                ),
                SizedBox(height: 16.h),
                _EventCard(
                  color: const Color(0xFF4CAF50),
                  title: '한강 피크닉',
                  participants: 'Sarah, Yuki 외 3명',
                  location: '여의도',
                  time: '14:00',
                  date: '3/28',
                ),
                SizedBox(height: 12.h),
                _EventCard(
                  color: const Color(0xFF2196F3),
                  title: '서울 맛집 투어',
                  participants: 'Tom, Min 외 5명',
                  location: '홍대',
                  time: '18:00',
                  date: '3/30',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// 간단한 월간 캘린더 위젯
class _MonthCalendar extends StatelessWidget {
  final int year;
  final int month;

  const _MonthCalendar({required this.year, required this.month});

  @override
  Widget build(BuildContext context) {
    final daysInMonth = DateTime(year, month + 1, 0).day;
    final firstWeekday = DateTime(year, month, 1).weekday % 7; // 일=0
    final today = DateTime.now();
    final weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // 이벤트가 있는 날짜 (mock)
    final eventDays = {3, 7, 12, 15, 21, 28};

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
      child: Column(
        children: [
          // 월 헤더
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(Icons.chevron_left,
                  size: 24.r, color: const Color(0xFF9CA3AF)),
              Text(
                '$year년 $month월',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF1A1A1A),
                ),
              ),
              Icon(Icons.chevron_right,
                  size: 24.r, color: const Color(0xFF9CA3AF)),
            ],
          ),
          SizedBox(height: 16.h),
          // 요일 헤더
          Row(
            children: weekdays
                .map((d) => Expanded(
                      child: Center(
                        child: Text(
                          d,
                          style: TextStyle(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w500,
                            color: d == '일'
                                ? const Color(0xFFEF4444)
                                : d == '토'
                                    ? const Color(0xFF3B82F6)
                                    : const Color(0xFF9CA3AF),
                          ),
                        ),
                      ),
                    ))
                .toList(),
          ),
          SizedBox(height: 8.h),
          // 날짜 그리드
          ...List.generate(6, (week) {
            return Padding(
              padding: EdgeInsets.only(bottom: 4.h),
              child: Row(
                children: List.generate(7, (weekday) {
                  final dayNum =
                      week * 7 + weekday - firstWeekday + 1;
                  if (dayNum < 1 || dayNum > daysInMonth) {
                    return const Expanded(child: SizedBox(height: 36));
                  }
                  final isToday = today.year == year &&
                      today.month == month &&
                      today.day == dayNum;
                  final hasEvent = eventDays.contains(dayNum);

                  return Expanded(
                    child: Container(
                      height: 36.h,
                      alignment: Alignment.center,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            width: 28.r,
                            height: 28.r,
                            decoration: isToday
                                ? BoxDecoration(
                                    color: const Color(0xFF4CAF50),
                                    shape: BoxShape.circle,
                                  )
                                : null,
                            alignment: Alignment.center,
                            child: Text(
                              '$dayNum',
                              style: TextStyle(
                                fontSize: 13.sp,
                                fontWeight: isToday
                                    ? FontWeight.w700
                                    : FontWeight.w400,
                                color: isToday
                                    ? Colors.white
                                    : weekday == 0
                                        ? const Color(0xFFEF4444)
                                        : weekday == 6
                                            ? const Color(0xFF3B82F6)
                                            : const Color(0xFF374151),
                              ),
                            ),
                          ),
                          if (hasEvent)
                            Container(
                              width: 4.r,
                              height: 4.r,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF4CAF50),
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                }),
              ),
            );
          }),
        ],
      ),
    );
  }
}

/// 이벤트 카드 (Figma: Event Container)
class _EventCard extends StatelessWidget {
  final Color color;
  final String title;
  final String participants;
  final String location;
  final String time;
  final String date;

  const _EventCard({
    required this.color,
    required this.title,
    required this.participants,
    required this.location,
    required this.time,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10.r),
        border: Border.all(color: const Color(0xFFF3F4F6)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Dot
          Padding(
            padding: EdgeInsets.only(top: 6.h),
            child: Container(
              width: 8.r,
              height: 8.r,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color,
              ),
            ),
          ),
          SizedBox(width: 12.w),
          // Event details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF1A1A1A),
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  participants,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: const Color(0xFF6B7280),
                  ),
                ),
                SizedBox(height: 4.h),
                Row(
                  children: [
                    Text(location,
                        style: TextStyle(
                            fontSize: 12.sp,
                            color: const Color(0xFF9CA3AF))),
                    _divider(),
                    Text(time,
                        style: TextStyle(
                            fontSize: 12.sp,
                            color: const Color(0xFF9CA3AF))),
                    _divider(),
                    Text(date,
                        style: TextStyle(
                            fontSize: 12.sp,
                            color: const Color(0xFF9CA3AF))),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _divider() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 8.w),
      child: Container(
        width: 1,
        height: 10.h,
        color: const Color(0xFFD1D5DB),
      ),
    );
  }
}

/// 후기 탭 (Figma: 행아웃 후기)
class _ReviewTab extends StatelessWidget {
  final String userId;

  const _ReviewTab({required this.userId});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(16.w, 24.h, 16.w, 0),
            child: Row(
              children: [
                Text(
                  '행아웃 후기',
                  style: TextStyle(
                    fontSize: 17.sp,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF1A1A1A),
                  ),
                ),
                SizedBox(width: 6.w),
                Text(
                  '(12)',
                  style: TextStyle(
                    fontSize: 15.sp,
                    color: const Color(0xFF9CA3AF),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 16.h),
          // 후기 리스트
          _ReviewItem(
            reviewerName: '김민수',
            date: '2026.03.15',
            content:
                '정말로 유쾌한 사람이에요! 서울에서 같이 맛집 다녔는데 정말 재미있었어요. 한국 문화에 대해 많이 알려줘서 감사했습니다.',
            hasImage: true,
          ),
          const Divider(height: 1, indent: 16, endIndent: 16,
              color: Color(0xFFF3F4F6)),
          _ReviewItem(
            reviewerName: 'Yuki',
            date: '2026.03.10',
            content:
                '같이 한강에서 피크닉 했어요. 너무 친절하고 재미있는 시간이었습니다. 또 만나고 싶어요!',
            hasImage: false,
          ),
          const Divider(height: 1, indent: 16, endIndent: 16,
              color: Color(0xFFF3F4F6)),
          _ReviewItem(
            reviewerName: 'Tom',
            date: '2026.02.28',
            content:
                '홍대에서 같이 쇼핑하고 카페 갔어요. 한국어도 잘 가르쳐줘서 공부에 도움이 많이 됐습니다.',
            hasImage: true,
          ),
          SizedBox(height: 80.h),
        ],
      ),
    );
  }
}

/// 개별 후기 아이템 (Figma: Review item with avatar + name + date + text + image)
class _ReviewItem extends StatelessWidget {
  final String reviewerName;
  final String date;
  final String content;
  final bool hasImage;

  const _ReviewItem({
    required this.reviewerName,
    required this.date,
    required this.content,
    required this.hasImage,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 리뷰어 아바타 (32x32)
          CircleAvatar(
            radius: 16.r,
            backgroundColor: const Color(0xFFE5E7EB),
            child: Icon(Icons.person,
                size: 18.r, color: const Color(0xFF9CA3AF)),
          ),
          SizedBox(width: 12.w),
          // 리뷰 내용
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      reviewerName,
                      style: TextStyle(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w600,
                        color: const Color(0xFF1A1A1A),
                      ),
                    ),
                    SizedBox(width: 8.w),
                    Text(
                      date,
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: const Color(0xFF9CA3AF),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 8.h),
                Text(
                  content,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: const Color(0xFF374151),
                    height: 1.5,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          // 이미지 (80x80)
          if (hasImage) ...[
            SizedBox(width: 12.w),
            Container(
              width: 80.r,
              height: 80.r,
              decoration: BoxDecoration(
                color: const Color(0xFFF3F4F6),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Icon(Icons.image,
                  size: 32.r, color: const Color(0xFFD1D5DB)),
            ),
          ],
        ],
      ),
    );
  }
}
