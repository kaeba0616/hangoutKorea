import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_avatar.dart';

/// Figma: profile/review (3073:11042)
/// - AppBar "Reviews"
/// - Review cards with avatar, name, rating, content
class ReviewListScreen extends StatelessWidget {
  final String userId;

  const ReviewListScreen({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '리뷰'),
      body: ListView.separated(
        padding: EdgeInsets.all(16.w),
        itemCount: 5,
        separatorBuilder: (_, __) => SizedBox(height: 12.h),
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () => context.push('/review/review_$index'),
            child: Container(
              padding: EdgeInsets.all(16.w),
              decoration: BoxDecoration(
                border: Border.all(color: const Color(0xFFE5E7EB)),
                borderRadius: BorderRadius.circular(10.r),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const HangkoAvatar.small(),
                      SizedBox(width: 10.w),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Reviewer ${index + 1}',
                              style: TextStyle(
                                fontSize: 14.sp,
                                fontWeight: FontWeight.w600,
                                color: const Color(0xFF1A1A1A),
                              ),
                            ),
                            SizedBox(height: 2.h),
                            Text(
                              '2일 전',
                              style: TextStyle(
                                fontSize: 12.sp,
                                color: const Color(0xFF9CA3AF),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: List.generate(
                          5,
                          (s) => Icon(
                            s < (4 - index % 2)
                                ? Icons.star
                                : Icons.star_border,
                            color: Colors.amber,
                            size: 14.r,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12.h),
                  Text(
                    '정말 좋은 사람이에요! 같이 시간 보내기 즐거웠습니다. 다음에도 꼭 다시 만나고 싶어요.',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: const Color(0xFF374151),
                      height: 1.5,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
