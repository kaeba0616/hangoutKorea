import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: auth/terms/detail (3610:3613)
/// - AppBar with title
/// - "이용약관" headline
/// - Scrollable paragraphs (제1조, 제2조, 부칙)
/// - Bottom button
class TermsDetailScreen extends StatefulWidget {
  const TermsDetailScreen({super.key});

  @override
  State<TermsDetailScreen> createState() => _TermsDetailScreenState();
}

class _TermsDetailScreenState extends State<TermsDetailScreen> {
  bool _agreed = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '약관 및 정책'),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 32.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Headline
                  Text(
                    '이용약관',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  // 제1조
                  _buildParagraph(
                    heading: '제1조 (목적)',
                    body:
                        '이 약관은 주식회사 Hangout in Korea(이하 "회사"라 합니다)가 제공하는 서비스(이하 "서비스"라 합니다) 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 필요한 제반 사항을 정함을 목적으로 합니다.',
                  ),
                  SizedBox(height: 24.h),
                  // 제2조
                  _buildParagraph(
                    heading: '제2조 (용어의 정의)',
                    subHeading: '① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
                    body:
                        '"이용고객"이란 회사가 제공하는 서비스를 이용하기 위해 앱스토어 사업자 또는 플랫폼사업자가 운영하는 앱스토어 마켓에서 애플리케이션을 다운로드 받은 자를 말합니다.\n\n'
                        '"이용자"란 이 약관 및 개인정보처리방침에 동의하고 회사가 제공하는 서비스 이용자격을 부여 받은 이용고객을 말합니다.',
                  ),
                  SizedBox(height: 24.h),
                  // 부칙
                  _buildParagraph(
                    heading: '[부칙] 개인정보보호책임자',
                    body:
                        '회원님의 개인정보를 보호하고 개인정보와 관련된 불만 등을 처리하기 위하여 서비스제공자는 고객서비스담당 부서 및 개인정보보호책임자를 두고 있습니다.\n\n'
                        '대표 : 양찬진\n이메일 : raffe7600@gmail.com\n전화 : 010-3342-7473\n\n'
                        '이 정책은 아래 시행일자부터 시행됩니다.\n시행일: 2026년 05월 01일',
                  ),
                ],
              ),
            ),
          ),
          // Agree checkbox + button
          Container(
            padding: EdgeInsets.symmetric(horizontal: 16.w),
            child: Row(
              children: [
                Checkbox(
                  value: _agreed,
                  onChanged: (v) => setState(() => _agreed = v ?? false),
                  activeColor: const Color(0xFF1A1A1A),
                ),
                Expanded(
                  child: Text(
                    '이용약관에 동의합니다',
                    style: TextStyle(fontSize: 14.sp),
                  ),
                ),
              ],
            ),
          ),
          HangkoBottomButton(
            label: '동의하고 계속하기',
            onPressed: _agreed ? () => context.go('/onboarding/profile') : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }

  Widget _buildParagraph({
    required String heading,
    String? subHeading,
    required String body,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          heading,
          style: TextStyle(
            fontSize: 15.sp,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF1A1A1A),
          ),
        ),
        if (subHeading != null) ...[
          SizedBox(height: 12.h),
          Text(
            subHeading,
            style: TextStyle(
              fontSize: 14.sp,
              color: const Color(0xFF374151),
            ),
          ),
        ],
        SizedBox(height: 12.h),
        Text(
          body,
          style: TextStyle(
            fontSize: 14.sp,
            color: const Color(0xFF6B7280),
            height: 1.6,
          ),
        ),
      ],
    );
  }
}
