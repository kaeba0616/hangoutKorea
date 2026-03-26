import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_avatar.dart';
import '../../../shared/widgets/follow_button.dart';

/// Figma: profile/following (3250:9712)
/// - AppBar "Following"
/// - User list with avatar + name + Following button
/// - Unfollow confirmation dialog
class FollowingListScreen extends StatefulWidget {
  final String userId;

  const FollowingListScreen({super.key, required this.userId});

  @override
  State<FollowingListScreen> createState() => _FollowingListScreenState();
}

class _FollowingListScreenState extends State<FollowingListScreen> {
  final _following = List.generate(8, (i) => (
        name: 'User ${i + 1}',
        isFollowing: true,
      ));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: 'Following'),
      body: ListView.separated(
        padding: EdgeInsets.symmetric(vertical: 8.h),
        itemCount: _following.length,
        separatorBuilder: (_, __) => Divider(
          height: 1,
          indent: 72.w,
          color: const Color(0xFFF3F4F6),
        ),
        itemBuilder: (context, index) {
          return Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
            child: Row(
              children: [
                const HangkoAvatar.small(),
                SizedBox(width: 12.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _following[index].name,
                        style: TextStyle(
                          fontSize: 15.sp,
                          fontWeight: FontWeight.w600,
                          color: const Color(0xFF1A1A1A),
                        ),
                      ),
                      SizedBox(height: 2.h),
                      Text(
                        'Nice to meet you!',
                        style: TextStyle(
                          fontSize: 13.sp,
                          color: const Color(0xFF9CA3AF),
                        ),
                      ),
                    ],
                  ),
                ),
                FollowButton(
                  isFollowing: _following[index].isFollowing,
                  onPressed: () =>
                      _showUnfollowDialog(context, index),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  void _showUnfollowDialog(BuildContext context, int index) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.r),
        ),
        title: const Text('언팔로우'),
        content: Text('${_following[index].name}님을 언팔로우 하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('취소',
                style: TextStyle(color: Color(0xFF6B7280))),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
            },
            child: const Text('언팔로우',
                style: TextStyle(color: Color(0xFFEF4444))),
          ),
        ],
      ),
    );
  }
}
