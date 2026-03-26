import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/splash
/// - 전체 배경 사진 (여행 이미지)
/// - 하단에 "Let's Hang out in Korea" 타이틀 (흰색, 굵게)
/// - 부제목
/// - "시작하기" 버튼
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          // 배경 이미지 placeholder (실제 사진으로 교체 예정)
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFF5B7B5E),
                  Color(0xFF8BA88D),
                  Color(0xFFB5C9B0),
                ],
              ),
            ),
            child: Center(
              child: Icon(
                Icons.photo_camera_back,
                size: 80.r,
                color: Colors.white24,
              ),
            ),
          ),

          // 하단 오버레이 그라데이션
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            height: 400.h,
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.transparent, Colors.black54],
                ),
              ),
            ),
          ),

          // Content
          SafeArea(
            child: Column(
              children: [
                const Spacer(),
                // 타이틀
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 24.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Let's Hang out\nin Korea",
                        style: TextStyle(
                          fontSize: 32.sp,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                          height: 1.2,
                        ),
                      ),
                      SizedBox(height: 12.h),
                      Text(
                        '낯설고 막막한 여행이 아닌,\n새롭고 설레는 즐거움을 발견하세요.',
                        style: TextStyle(
                          fontSize: 14.sp,
                          color: Colors.white70,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 32.h),
                HangkoBottomButton(
                  label: '시작하기',
                  onPressed: () => context.go('/auth'),
                ),
                SizedBox(height: 10.h),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
