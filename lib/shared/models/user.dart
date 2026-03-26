import 'language.dart';
import 'nationality.dart';

class User {
  final String id;
  final String name;
  final String? profileImageUrl;
  final String? bio;
  final List<UserLanguage> languages;
  final Nationality nationality;
  final int followerCount;
  final int followingCount;
  final int reviewCount;
  final bool isFollowing;

  const User({
    required this.id,
    required this.name,
    this.profileImageUrl,
    this.bio,
    this.languages = const [],
    required this.nationality,
    this.followerCount = 0,
    this.followingCount = 0,
    this.reviewCount = 0,
    this.isFollowing = false,
  });
}
