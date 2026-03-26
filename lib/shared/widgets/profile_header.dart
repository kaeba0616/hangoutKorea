import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'hangko_avatar.dart';
import 'hangko_chip.dart';

/// Figma: User Profile header (avatar 80x80 + info)
class ProfileHeader extends StatelessWidget {
  final String username;
  final String? details;
  final String? imageUrl;
  final bool isVerified;
  final int followingCount;
  final int followersCount;
  final List<({String language, String level})> languages;
  final String? description;
  final VoidCallback? onFollowingTap;
  final VoidCallback? onFollowersTap;

  const ProfileHeader({
    super.key,
    required this.username,
    this.details,
    this.imageUrl,
    this.isVerified = false,
    this.followingCount = 0,
    this.followersCount = 0,
    this.languages = const [],
    this.description,
    this.onFollowingTap,
    this.onFollowersTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 32.h),
          // Avatar + Info row
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              HangkoAvatar(size: 80, imageUrl: imageUrl),
              SizedBox(width: 16.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Username + verified
                    Row(
                      children: [
                        Text(
                          username,
                          style: TextStyle(
                            fontSize: 17.sp,
                            fontWeight: FontWeight.w700,
                            color: const Color(0xFF1A1A1A),
                          ),
                        ),
                        if (isVerified) ...[
                          SizedBox(width: 4.w),
                          Icon(Icons.verified,
                              size: 20.r, color: const Color(0xFF3B82F6)),
                        ],
                      ],
                    ),
                    SizedBox(height: 4.h),
                    // User details
                    if (details != null)
                      Text(
                        details!,
                        style: TextStyle(
                          fontSize: 14.sp,
                          color: const Color(0xFF6B7280),
                        ),
                      ),
                    SizedBox(height: 8.h),
                    // Following / Followers
                    Row(
                      children: [
                        GestureDetector(
                          onTap: onFollowingTap,
                          child: _statText(followingCount, 'Following'),
                        ),
                        SizedBox(width: 12.w),
                        GestureDetector(
                          onTap: onFollowersTap,
                          child: _statText(followersCount, 'Followers'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 20.h),
          // Language tags
          if (languages.isNotEmpty)
            Wrap(
              spacing: 8.w,
              runSpacing: 8.h,
              children: languages
                  .map((l) =>
                      LanguageLevelChip(language: l.language, level: l.level))
                  .toList(),
            ),
          if (languages.isNotEmpty) SizedBox(height: 12.h),
          // Description
          if (description != null)
            Text(
              description!,
              style: TextStyle(
                fontSize: 14.sp,
                color: const Color(0xFF374151),
                height: 1.5,
              ),
            ),
        ],
      ),
    );
  }

  Widget _statText(int count, String label) {
    return Row(
      children: [
        Text(
          '$count',
          style: TextStyle(
            fontSize: 14.sp,
            fontWeight: FontWeight.w700,
            color: const Color(0xFF1A1A1A),
          ),
        ),
        SizedBox(width: 4.w),
        Text(
          label,
          style: TextStyle(
            fontSize: 13.sp,
            color: const Color(0xFF9CA3AF),
          ),
        ),
      ],
    );
  }
}
