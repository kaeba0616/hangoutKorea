import 'user.dart';

class Review {
  final String id;
  final User author;
  final String targetUserId;
  final String content;
  final double rating;
  final DateTime createdAt;

  const Review({
    required this.id,
    required this.author,
    required this.targetUserId,
    required this.content,
    required this.rating,
    required this.createdAt,
  });
}
