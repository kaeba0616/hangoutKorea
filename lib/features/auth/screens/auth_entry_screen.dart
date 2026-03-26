import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: auth/entry
/// - 중앙 정렬 큰 타이틀 "즐거운 여행을 시작하세요."
/// - LINE (초록), Apple (검정), Kakao (노랑) SNS 버튼
/// - 이메일로 계속하기 (아웃라인)
/// - "로그인에 문제가 있나요?" 링크 (초록색)
class AuthEntryScreen extends StatelessWidget {
  const AuthEntryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 28.w),
          child: Column(
            children: [
              const Spacer(flex: 2),
              // Headline - 중앙 정렬
              Text(
                '즐거운 여행을\n시작하세요.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 30.sp,
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF1A1A1A),
                  height: 1.35,
                ),
              ),
              const Spacer(flex: 2),
              // LINE 버튼 (초록)
              HangkoButton(
                label: 'LINE으로 계속하기',
                type: HangkoButtonType.sns,
                backgroundColor: const Color(0xFF06C755),
                icon: const Icon(Icons.chat, size: 20, color: Colors.white),
                onPressed: () {},
              ),
              SizedBox(height: 12.h),
              // Apple 버튼 (검정)
              HangkoButton(
                label: 'Apple로 계속하기',
                type: HangkoButtonType.sns,
                backgroundColor: const Color(0xFF000000),
                icon: const Icon(Icons.apple, size: 22, color: Colors.white),
                onPressed: () {},
              ),
              SizedBox(height: 12.h),
              // Kakao 버튼 (노랑)
              HangkoButton(
                label: 'Kakao로 계속하기',
                type: HangkoButtonType.sns,
                backgroundColor: const Color(0xFFFEE500),
                icon: const Icon(Icons.chat_bubble, size: 20,
                    color: Color(0xFF3C1E1E)),
                onPressed: () {},
              ),
              SizedBox(height: 12.h),
              // 이메일 버튼 (아웃라인)
              HangkoButton(
                label: '이메일로 계속하기',
                type: HangkoButtonType.secondary,
                onPressed: () => context.push('/auth/login'),
              ),
              SizedBox(height: 40.h),
              // 로그인 문제 링크
              TextButton(
                onPressed: () {},
                child: Text(
                  '로그인에 문제가 있나요?',
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: const Color(0xFF4CAF50),
                  ),
                ),
              ),
              SizedBox(height: 20.h),
            ],
          ),
        ),
      ),
    );
  }
}
