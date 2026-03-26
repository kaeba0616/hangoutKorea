import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_avatar.dart';

/// Figma: profile/follower (3114:4226)
/// - AppBar "Followers"
/// - User list with avatar + name + remove button
/// - Remove confirmation dialog
class FollowerListScreen extends StatefulWidget {
  final String userId;

  const FollowerListScreen({super.key, required this.userId});

  @override
  State<FollowerListScreen> createState() => _FollowerListScreenState();
}

class _FollowerListScreenState extends State<FollowerListScreen> {
  final _followers = List.generate(10, (i) => 'Follower ${i + 1}');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: 'Followers'),
      body: ListView.separated(
        padding: EdgeInsets.symmetric(vertical: 8.h),
        itemCount: _followers.length,
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
                        _followers[index],
                        style: TextStyle(
                          fontSize: 15.sp,
                          fontWeight: FontWeight.w600,
                          color: const Color(0xFF1A1A1A),
                        ),
                      ),
                      SizedBox(height: 2.h),
                      Text(
                        'Hello!',
                        style: TextStyle(
                          fontSize: 13.sp,
                          color: const Color(0xFF9CA3AF),
                        ),
                      ),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: () => _showRemoveDialog(context, index),
                  style: TextButton.styleFrom(
                    foregroundColor: const Color(0xFF6B7280),
                    textStyle: TextStyle(fontSize: 13.sp),
                  ),
                  child: const Text('삭제'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  void _showRemoveDialog(BuildContext context, int index) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.r),
        ),
        title: const Text('팔로워 삭제'),
        content: Text('${_followers[index]}님을 팔로워에서 삭제하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('취소',
                style: TextStyle(color: Color(0xFF6B7280))),
          ),
          TextButton(
            onPressed: () {
              setState(() => _followers.removeAt(index));
              Navigator.pop(ctx);
            },
            child: const Text('삭제',
                style: TextStyle(color: Color(0xFFEF4444))),
          ),
        ],
      ),
    );
  }
}
