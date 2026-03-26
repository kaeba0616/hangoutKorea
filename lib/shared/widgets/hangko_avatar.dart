import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

/// Figma: img-profile-ugc / img-profile-default
class HangkoAvatar extends StatelessWidget {
  final double size;
  final String? imageUrl;
  final bool showEditButton;
  final VoidCallback? onEditTap;

  const HangkoAvatar({
    super.key,
    this.size = 80,
    this.imageUrl,
    this.showEditButton = false,
    this.onEditTap,
  });

  /// Profile setup / edit용 큰 아바타 (96px)
  const HangkoAvatar.large({
    super.key,
    this.imageUrl,
    this.showEditButton = true,
    this.onEditTap,
  }) : size = 96;

  /// 리스트 아이템용 작은 아바타 (40px)
  const HangkoAvatar.small({
    super.key,
    this.imageUrl,
    this.showEditButton = false,
    this.onEditTap,
  }) : size = 40;

  @override
  Widget build(BuildContext context) {
    final avatarSize = size.r;

    return Stack(
      children: [
        CircleAvatar(
          radius: avatarSize / 2,
          backgroundColor: const Color(0xFFE5E7EB),
          backgroundImage:
              imageUrl != null ? NetworkImage(imageUrl!) : null,
          child: imageUrl == null
              ? Icon(Icons.person,
                  size: avatarSize * 0.45,
                  color: const Color(0xFF9CA3AF))
              : null,
        ),
        if (showEditButton)
          Positioned(
            right: 0,
            bottom: 0,
            child: GestureDetector(
              onTap: onEditTap,
              child: Container(
                width: 40.r,
                height: 40.r,
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                ),
                child: Icon(
                  Icons.camera_alt,
                  size: 18.r,
                  color: Colors.white,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
