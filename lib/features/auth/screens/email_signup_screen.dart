import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_text_field.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: auth/signup (비밀번호 재설정)
/// - "가입한 이메일 주소를 입력해주세요." 큰 타이틀
/// - 이메일 필드
/// - 하단 "인증하기" 버튼
class EmailSignupScreen extends StatefulWidget {
  const EmailSignupScreen({super.key});

  @override
  State<EmailSignupScreen> createState() => _EmailSignupScreenState();
}

class _EmailSignupScreenState extends State<EmailSignupScreen> {
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const HangkoAppBar(title: '비밀번호 재설정'),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 24.h),
                  Text(
                    '가입한 이메일 주소를\n입력해주세요.',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF1A1A1A),
                      height: 1.3,
                    ),
                  ),
                  SizedBox(height: 24.h),
                  HangkoTextField(
                    label: '이메일',
                    hintText: 'email@example.com',
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    onChanged: (v) => setState(() {}),
                  ),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '인증하기',
            onPressed: _emailController.text.isNotEmpty
                ? () => context.push('/auth/terms')
                : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom + 10.h),
        ],
      ),
    );
  }
}
