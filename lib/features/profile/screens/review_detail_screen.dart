import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_avatar.dart';

/// Figma: profile/review/detail (3610:8264)
class ReviewDetailScreen extends StatelessWidget {
  final String reviewId;

  const ReviewDetailScreen({super.key, required this.reviewId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '리뷰'),
      body: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 16.h),
            // Reviewer info
            Row(
              children: [
                const HangkoAvatar.small(),
                SizedBox(width: 12.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Reviewer Name',
                        style: TextStyle(
                          fontSize: 15.sp,
                          fontWeight: FontWeight.w600,
                          color: const Color(0xFF1A1A1A),
                        ),
                      ),
                      SizedBox(height: 4.h),
                      Row(
                        children: [
                          ...List.generate(
                            5,
                            (i) => Icon(
                              i < 4 ? Icons.star : Icons.star_border,
                              color: Colors.amber,
                              size: 16.r,
                            ),
                          ),
                          SizedBox(width: 8.w),
                          Text(
                            '2일 전',
                            style: TextStyle(
                              fontSize: 12.sp,
                              color: const Color(0xFF9CA3AF),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 24.h),
            // Review content
            Text(
              '정말 좋은 사람이에요! 같이 시간 보내기 즐거웠습니다. '
              '서울에서 같이 맛집도 다니고 재미있는 시간을 보냈어요. '
              '다음에도 꼭 다시 만나고 싶습니다. 추천합니다!',
              style: TextStyle(
                fontSize: 15.sp,
                color: const Color(0xFF374151),
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
