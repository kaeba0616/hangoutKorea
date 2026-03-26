import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_text_field.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: review/write (3610:8110)
/// - AppBar
/// - Rating stars
/// - Review text area
/// - Submit button
class WriteReviewScreen extends StatefulWidget {
  final String targetUserId;

  const WriteReviewScreen({super.key, required this.targetUserId});

  @override
  State<WriteReviewScreen> createState() => _WriteReviewScreenState();
}

class _WriteReviewScreenState extends State<WriteReviewScreen> {
  int _rating = 0;
  final _reviewController = TextEditingController();

  @override
  void dispose() {
    _reviewController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '리뷰 작성'),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 32.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Rating section
                  Text(
                    '평점',
                    style: TextStyle(
                      fontSize: 15.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 12.h),
                  Row(
                    children: List.generate(
                      5,
                      (i) => GestureDetector(
                        onTap: () => setState(() => _rating = i + 1),
                        child: Padding(
                          padding: EdgeInsets.only(right: 8.w),
                          child: Icon(
                            i < _rating ? Icons.star : Icons.star_border,
                            color: Colors.amber,
                            size: 36.r,
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  // Review text
                  HangkoTextArea(
                    label: '리뷰',
                    hintText: '리뷰를 작성해 주세요...',
                    controller: _reviewController,
                  ),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '작성 완료',
            onPressed: _rating > 0
                ? () => Navigator.pop(context)
                : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }
}
