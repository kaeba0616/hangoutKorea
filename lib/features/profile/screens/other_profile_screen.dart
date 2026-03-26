import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/profile_header.dart';

/// Figma: profile (3263:12565) - other user's profile
class OtherProfileScreen extends StatefulWidget {
  final String userId;

  const OtherProfileScreen({super.key, required this.userId});

  @override
  State<OtherProfileScreen> createState() => _OtherProfileScreenState();
}

class _OtherProfileScreenState extends State<OtherProfileScreen> {
  bool _isFollowing = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '프로필'),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ProfileHeader(
              username: 'Other User',
              details: '28세 · Male · 🇯🇵 Japan',
              isVerified: true,
              followingCount: 64,
              followersCount: 120,
              languages: [
                (language: '일본어', level: '원어민'),
                (language: '한국어', level: '중급'),
              ],
              description: '도쿄에서 왔어요. 한국 문화에 관심이 많습니다!',
              onFollowingTap: () =>
                  context.push('/profile/${widget.userId}/following'),
              onFollowersTap: () =>
                  context.push('/profile/${widget.userId}/followers'),
            ),
            SizedBox(height: 16.h),
            // Follow + Review buttons
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 44.h,
                      child: _isFollowing
                          ? OutlinedButton(
                              onPressed: () =>
                                  setState(() => _isFollowing = false),
                              style: OutlinedButton.styleFrom(
                                foregroundColor: const Color(0xFF6B7280),
                                side:
                                    const BorderSide(color: Color(0xFFE5E7EB)),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10.r),
                                ),
                              ),
                              child: const Text('Following'),
                            )
                          : ElevatedButton(
                              onPressed: () =>
                                  setState(() => _isFollowing = true),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF1A1A1A),
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10.r),
                                ),
                              ),
                              child: const Text('Follow'),
                            ),
                    ),
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: SizedBox(
                      height: 44.h,
                      child: OutlinedButton(
                        onPressed: () =>
                            context.push('/review/write/${widget.userId}'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF1A1A1A),
                          side: const BorderSide(color: Color(0xFFE5E7EB)),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.r),
                          ),
                        ),
                        child: const Text('리뷰 작성'),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 24.h),
            // Reviews section
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '리뷰',
                    style: TextStyle(
                      fontSize: 17.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  GestureDetector(
                    onTap: () =>
                        context.push('/profile/${widget.userId}/reviews'),
                    child: Text(
                      '모두 보기',
                      style: TextStyle(
                        fontSize: 14.sp,
                        color: const Color(0xFF6B7280),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.h),
            // Review cards placeholder
            ...List.generate(2, (i) => _buildReviewCard(i)),
          ],
        ),
      ),
    );
  }

  Widget _buildReviewCard(int index) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 6.h),
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
                CircleAvatar(
                  radius: 16.r,
                  backgroundColor: const Color(0xFFE5E7EB),
                  child: Icon(Icons.person, size: 18.r, color: const Color(0xFF9CA3AF)),
                ),
                SizedBox(width: 8.w),
                Text(
                  'Reviewer ${index + 1}',
                  style: TextStyle(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const Spacer(),
                Row(
                  children: List.generate(
                    5,
                    (s) => Icon(
                      s < 4 ? Icons.star : Icons.star_border,
                      color: Colors.amber,
                      size: 14.r,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 8.h),
            Text(
              '정말 좋은 사람이에요! 같이 시간 보내기 즐거웠습니다.',
              style: TextStyle(
                fontSize: 14.sp,
                color: const Color(0xFF374151),
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
