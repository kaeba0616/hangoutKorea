import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/profile_header.dart';

/// Figma: profile/menu (3250:9254)
/// - Same ProfileHeader as profile screen
/// - Menu list items
class ProfileMenuScreen extends StatelessWidget {
  const ProfileMenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '설정'),
      body: Column(
        children: [
          // Compact profile header
          const ProfileHeader(
            username: '행아코',
            details: '25세 · Female · 🇺🇸 USA',
            isVerified: true,
            followingCount: 128,
            followersCount: 256,
            languages: [
              (language: '한국어', level: '상급'),
              (language: '영어', level: '원어민'),
            ],
          ),
          SizedBox(height: 16.h),
          const Divider(height: 1),
          // Menu items
          Expanded(
            child: ListView(
              children: [
                _menuItem(Icons.person_outline, '프로필 편집', () =>
                    context.push('/profile/me/edit')),
                _menuItem(Icons.people_outline, '팔로워', () =>
                    context.push('/profile/me/followers')),
                _menuItem(Icons.person_add_outlined, '팔로잉', () =>
                    context.push('/profile/me/following')),
                _menuItem(Icons.star_border, '리뷰', () =>
                    context.push('/profile/me/reviews')),
                const Divider(height: 1),
                _menuItem(Icons.notifications_outlined, '알림 설정', () {}),
                _menuItem(Icons.lock_outline, '개인정보 보호', () {}),
                _menuItem(Icons.description_outlined, '이용약관', () =>
                    context.push('/auth/terms')),
                _menuItem(Icons.help_outline, '고객센터', () {}),
                const Divider(height: 1),
                _menuItem(Icons.logout, '로그아웃', () => context.go('/auth'),
                    isDestructive: true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _menuItem(
    IconData icon,
    String title,
    VoidCallback onTap, {
    bool isDestructive = false,
  }) {
    final color = isDestructive ? const Color(0xFFEF4444) : const Color(0xFF1A1A1A);
    return ListTile(
      leading: Icon(icon, color: color, size: 22.r),
      title: Text(
        title,
        style: TextStyle(
          fontSize: 15.sp,
          color: color,
        ),
      ),
      trailing: isDestructive
          ? null
          : Icon(Icons.chevron_right, color: const Color(0xFF9CA3AF), size: 20.r),
      onTap: onTap,
    );
  }
}
