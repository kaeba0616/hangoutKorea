import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: matching-5 - 매칭 결과 없음
/// - AppBar "매칭" + X 닫기
/// - "매칭 결과가 없어요." 큰 타이틀
/// - "조건을 변경하거나 다시 시도해 보세요."
/// - 이모지
/// - "다시 찾기" 버튼
class MatchingResultScreen extends StatelessWidget {
  const MatchingResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        title: Text(
          '매칭',
          style: TextStyle(
            fontSize: 17.sp,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF1A1A1A),
          ),
        ),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.close, color: Color(0xFF1A1A1A)),
            onPressed: () => context.go('/matching'),
          ),
        ],
      ),
      body: Column(
        children: [
          const Spacer(flex: 2),
          Text(
            '매칭 결과가 없어요.',
            style: TextStyle(
              fontSize: 26.sp,
              fontWeight: FontWeight.w800,
              color: const Color(0xFF1A1A1A),
            ),
          ),
          SizedBox(height: 12.h),
          Text(
            '조건을 변경하거나 다시 시도해 보세요.',
            style: TextStyle(
              fontSize: 15.sp,
              color: const Color(0xFF9CA3AF),
            ),
          ),
          SizedBox(height: 40.h),
          Text('🤯', style: TextStyle(fontSize: 80.sp)),
          const Spacer(flex: 3),
          HangkoBottomButton(
            label: '다시 찾기',
            onPressed: () => context.go('/matching'),
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom + 10.h),
        ],
      ),
    );
  }
}
