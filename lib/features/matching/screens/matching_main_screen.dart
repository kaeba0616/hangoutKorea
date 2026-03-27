import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: matching.png - 매칭 메인
/// - AppBar "매칭"
/// - 희망 일정 (미니 캘린더)
/// - 매칭 위치 설정 (지도 미리보기 "Seoul")
/// - 사용 언어 수준
/// - 선호 조건 설정
/// - "매칭하기" 버튼
class MatchingMainScreen extends StatelessWidget {
  const MatchingMainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: HangkoAppBar(
        title: '매칭',
        showBackButton: false,
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 16.h),
                  // 희망 일정
                  _sectionTitle('희망 일정'),
                  SizedBox(height: 12.h),
                  _MiniCalendar(),
                  SizedBox(height: 24.h),

                  // 매칭 위치 설정
                  _sectionTitle('매칭 위치 설정'),
                  SizedBox(height: 12.h),
                  GestureDetector(
                    onTap: () => context.push('/matching/location'),
                    child: Container(
                      height: 120.h,
                      decoration: BoxDecoration(
                        color: const Color(0xFFE8F5E9),
                        borderRadius: BorderRadius.circular(12.r),
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Icon(Icons.map,
                                size: 40.r, color: const Color(0xFF81C784)),
                          ),
                          Positioned(
                            left: 16.w,
                            bottom: 12.h,
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 12.w, vertical: 6.h),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(8.r),
                              ),
                              child: Text(
                                'Seoul',
                                style: TextStyle(
                                  fontSize: 13.sp,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 24.h),

                  // 사용 언어 수준
                  _sectionTitle('사용 언어 수준'),
                  SizedBox(height: 12.h),
                  Wrap(
                    spacing: 8.w,
                    runSpacing: 8.h,
                    children: [
                      _languageChip('한국어', '상급'),
                      _languageChip('영어', '원어민'),
                    ],
                  ),
                  SizedBox(height: 24.h),

                  // 선호 조건 설정
                  _sectionTitle('선호 조건 설정'),
                  SizedBox(height: 12.h),
                  _conditionRow('성별', '전체'),
                  _conditionRow('나이', '20세 ~ 30세'),
                  _conditionRow('국적', '전체'),
                  SizedBox(height: 24.h),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '매칭하기',
            onPressed: () => context.push('/matching/loading'),
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 16.sp,
        fontWeight: FontWeight.w700,
        color: const Color(0xFF1A1A1A),
      ),
    );
  }

  Widget _languageChip(String lang, String level) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
      decoration: BoxDecoration(
        color: const Color(0xFFF3F4F6),
        borderRadius: BorderRadius.circular(20.r),
      ),
      child: Text(
        '$lang · $level',
        style: TextStyle(fontSize: 13.sp, color: const Color(0xFF374151)),
      ),
    );
  }

  Widget _conditionRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label,
              style: TextStyle(
                  fontSize: 14.sp, color: const Color(0xFF6B7280))),
          Row(
            children: [
              Text(value,
                  style: TextStyle(
                      fontSize: 14.sp, color: const Color(0xFF1A1A1A))),
              SizedBox(width: 4.w),
              Icon(Icons.chevron_right,
                  size: 18.r, color: const Color(0xFF9CA3AF)),
            ],
          ),
        ],
      ),
    );
  }
}

class _MiniCalendar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    final selectedDays = {25, 26, 27};

    return Container(
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFFF3F4F6)),
        borderRadius: BorderRadius.circular(12.r),
      ),
      child: Column(
        children: [
          Text(
            '${now.year}년 ${now.month}월',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF1A1A1A),
            ),
          ),
          SizedBox(height: 8.h),
          Row(
            children: weekdays
                .map((d) => Expanded(
                      child: Center(
                        child: Text(d,
                            style: TextStyle(
                                fontSize: 11.sp,
                                color: const Color(0xFF9CA3AF))),
                      ),
                    ))
                .toList(),
          ),
          SizedBox(height: 4.h),
          // 간략한 주간 뷰 (현재 주)
          Row(
            children: List.generate(7, (i) {
              final day = now.day - now.weekday % 7 + i;
              final isSelected = selectedDays.contains(day);
              final isToday = day == now.day;
              return Expanded(
                child: Container(
                  height: 32.h,
                  alignment: Alignment.center,
                  child: Container(
                    width: 28.r,
                    height: 28.r,
                    decoration: isSelected
                        ? BoxDecoration(
                            color: const Color(0xFF4CAF50),
                            shape: BoxShape.circle,
                          )
                        : null,
                    alignment: Alignment.center,
                    child: Text(
                      day > 0 && day <= 31 ? '$day' : '',
                      style: TextStyle(
                        fontSize: 13.sp,
                        fontWeight: isToday || isSelected
                            ? FontWeight.w700
                            : FontWeight.w400,
                        color: isSelected
                            ? Colors.white
                            : const Color(0xFF374151),
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}
