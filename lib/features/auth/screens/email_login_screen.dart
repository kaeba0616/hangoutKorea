import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_text_field.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: auth/email-password
/// - 단계별 진행: 이메일 입력 → 비밀번호 입력
/// - AppBar "이메일로 계속하기"
/// - 큰 타이틀 "이메일을 입력하세요." (왼쪽 정렬, 굵게)
/// - 이메일 필드 (오른쪽에 메일 아이콘)
/// - 하단 그라데이션 버튼
class EmailLoginScreen extends StatefulWidget {
  const EmailLoginScreen({super.key});

  @override
  State<EmailLoginScreen> createState() => _EmailLoginScreenState();
}

class _EmailLoginScreenState extends State<EmailLoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _showPassword = false;
  bool _emailEntered = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const HangkoAppBar(title: '이메일로 계속하기'),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 24.h),
                  // 큰 타이틀
                  Text(
                    _emailEntered
                        ? '비밀번호를 입력하세요.'
                        : '이메일을 입력하세요.',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF1A1A1A),
                      height: 1.3,
                    ),
                  ),
                  SizedBox(height: 24.h),
                  // 이메일 필드
                  HangkoTextField(
                    label: '이메일',
                    hintText: '이메일을 입력하세요',
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    onChanged: (v) => setState(() {}),
                  ),
                  if (_emailEntered) ...[
                    SizedBox(height: 16.h),
                    HangkoTextField(
                      label: '비밀번호',
                      hintText: '비밀번호를 입력하세요',
                      controller: _passwordController,
                      obscureText: !_showPassword,
                    ),
                  ],
                  if (_emailEntered) ...[
                    const Spacer(),
                    Center(
                      child: TextButton(
                        onPressed: () {},
                        child: Text(
                          '비밀번호를 잊으셨나요?',
                          style: TextStyle(
                            fontSize: 14.sp,
                            color: const Color(0xFF4CAF50),
                          ),
                        ),
                      ),
                    ),
                  ] else
                    const Spacer(),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: _emailEntered ? '로그인' : '다음',
            onPressed: _emailController.text.isNotEmpty
                ? () {
                    if (!_emailEntered) {
                      setState(() => _emailEntered = true);
                    } else {
                      context.go('/onboarding/profile');
                    }
                  }
                : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom + 10.h),
        ],
      ),
    );
  }
}
