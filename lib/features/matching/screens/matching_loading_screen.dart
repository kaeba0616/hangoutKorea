import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: matching-4 - 매칭 중
/// - AppBar "매칭"
/// - "매칭 중..." 큰 타이틀
/// - "나와 잘 맞는 유저를 찾고 있어요."
/// - 로딩 dots
/// - "매칭 취소" 버튼 (비활성 스타일)
class MatchingLoadingScreen extends StatefulWidget {
  const MatchingLoadingScreen({super.key});

  @override
  State<MatchingLoadingScreen> createState() => _MatchingLoadingScreenState();
}

class _MatchingLoadingScreenState extends State<MatchingLoadingScreen> {
  @override
  void initState() {
    super.initState();
    // 3초 후 결과 화면으로 이동 (데모)
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) context.go('/matching/result');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const HangkoAppBar(title: '매칭'),
      body: Column(
        children: [
          const Spacer(flex: 2),
          Text(
            '매칭 중...',
            style: TextStyle(
              fontSize: 28.sp,
              fontWeight: FontWeight.w800,
              color: const Color(0xFF1A1A1A),
            ),
          ),
          SizedBox(height: 12.h),
          Text(
            '나와 잘 맞는 유저를 찾고 있어요.',
            style: TextStyle(
              fontSize: 15.sp,
              color: const Color(0xFF9CA3AF),
            ),
          ),
          SizedBox(height: 40.h),
          // 로딩 인디케이터
          SizedBox(
            width: 60.w,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(3, (i) => _dot(i)),
            ),
          ),
          const Spacer(flex: 3),
          HangkoBottomButton(
            label: '매칭 취소',
            onPressed: null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom + 10.h),
        ],
      ),
    );
  }

  Widget _dot(int index) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.3, end: 1.0),
      duration: Duration(milliseconds: 600 + index * 200),
      builder: (context, value, child) {
        return Container(
          width: 10.r,
          height: 10.r,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Color.lerp(
              const Color(0xFFD1D5DB),
              const Color(0xFF9CA3AF),
              value,
            ),
          ),
        );
      },
    );
  }
}
