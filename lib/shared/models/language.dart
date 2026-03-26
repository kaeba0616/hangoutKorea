enum ProficiencyLevel {
  beginner,
  elementary,
  intermediate,
  advanced,
  native;

  String get label {
    switch (this) {
      case ProficiencyLevel.beginner:
        return 'Beginner';
      case ProficiencyLevel.elementary:
        return 'Elementary';
      case ProficiencyLevel.intermediate:
        return 'Intermediate';
      case ProficiencyLevel.advanced:
        return 'Advanced';
      case ProficiencyLevel.native:
        return 'Native';
    }
  }
}

class UserLanguage {
  final String code;
  final String name;
  final ProficiencyLevel proficiency;

  const UserLanguage({
    required this.code,
    required this.name,
    required this.proficiency,
  });
}
