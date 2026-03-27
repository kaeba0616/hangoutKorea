import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_text_field.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: Chat-5 - 약속 잡기
/// - X 닫기 버튼
/// - "어떤 약속을 잡을까요?" 큰 타이틀
/// - 모임명, 날짜, 시간, 장소 입력 필드
/// - "완료" 버튼
class CreateAppointmentScreen extends StatelessWidget {
  const CreateAppointmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.close, color: Color(0xFF1A1A1A)),
            onPressed: () => Navigator.pop(context),
          ),
        ],
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
                  Text(
                    '어떤 약속을 잡을까요?',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  const HangkoTextField(
                    label: '모임명',
                    hintText: '재밌는 제목을 지어 주세요',
                  ),
                  SizedBox(height: 20.h),
                  const HangkoTextField(
                    label: '날짜',
                    hintText: '날짜를 선택해주세요',
                    readOnly: true,
                  ),
                  SizedBox(height: 20.h),
                  const HangkoTextField(
                    label: '시간',
                    hintText: '시간을 선택해주세요',
                    readOnly: true,
                  ),
                  SizedBox(height: 20.h),
                  const HangkoSelectBox(
                    label: '장소',
                    value: '만날 장소를 선택해주세요',
                  ),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '완료',
            onPressed: () => Navigator.pop(context),
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }
}
