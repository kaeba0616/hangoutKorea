class Nationality {
  final String code;
  final String name;
  final String? flagEmoji;

  const Nationality({
    required this.code,
    required this.name,
    this.flagEmoji,
  });
}
