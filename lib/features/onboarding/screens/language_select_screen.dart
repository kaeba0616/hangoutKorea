import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_search_bar.dart';
import '../../../shared/widgets/hangko_chip.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/profile/language (3610:3684)
/// - AppBar
/// - "사용할 수 있는 언어를 모두 선택하세요" heading
/// - "최대 5개까지 선택할 수 있어요" subheading
/// - SearchBar
/// - Selected language chips
/// - Language list (한국어, 영어, 일본어, 중국어, 스페인어...)
/// - Bottom fixed button
class LanguageSelectScreen extends StatefulWidget {
  const LanguageSelectScreen({super.key});

  @override
  State<LanguageSelectScreen> createState() => _LanguageSelectScreenState();
}

class _LanguageSelectScreenState extends State<LanguageSelectScreen> {
  final _searchController = TextEditingController();
  final Set<String> _selected = {'한국어', '영어'};

  final _allLanguages = [
    '한국어',
    '영어',
    '일본어',
    '중국어',
    '스페인어',
    '프랑스어',
    '포르투갈어',
    '독일어',
    '이태리어',
    '러시아어',
  ];

  List<String> get _filteredLanguages {
    final query = _searchController.text;
    if (query.isEmpty) return _allLanguages;
    return _allLanguages.where((l) => l.contains(query)).toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '사용 언어'),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 32.h),
                  // Headline
                  Text(
                    '사용할 수 있는 언어를\n모두 선택하세요',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF1A1A1A),
                      height: 1.3,
                    ),
                  ),
                  SizedBox(height: 16.h),
                  Text(
                    '최대 5개까지 선택할 수 있어요',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: const Color(0xFF9CA3AF),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  // SearchBar
                  HangkoSearchBar(
                    hintText: '검색해주세요...',
                    controller: _searchController,
                    onChanged: (_) => setState(() {}),
                  ),
                  SizedBox(height: 16.h),
                  // Selected chips
                  if (_selected.isNotEmpty)
                    Wrap(
                      spacing: 8.w,
                      children: _selected
                          .map((lang) => HangkoChip(
                                label: lang,
                                selected: true,
                                onDelete: () =>
                                    setState(() => _selected.remove(lang)),
                              ))
                          .toList(),
                    ),
                  if (_selected.isNotEmpty) SizedBox(height: 16.h),
                  // Language list
                  Expanded(
                    child: ListView.separated(
                      itemCount: _filteredLanguages.length,
                      separatorBuilder: (_, __) => SizedBox(height: 12.h),
                      itemBuilder: (context, index) {
                        final lang = _filteredLanguages[index];
                        final isSelected = _selected.contains(lang);
                        return InkWell(
                          onTap: () {
                            setState(() {
                              if (isSelected) {
                                _selected.remove(lang);
                              } else if (_selected.length < 5) {
                                _selected.add(lang);
                              }
                            });
                          },
                          child: Container(
                            height: 48.h,
                            padding: EdgeInsets.symmetric(horizontal: 8.w),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    lang,
                                    style: TextStyle(
                                      fontSize: 15.sp,
                                      fontWeight: isSelected
                                          ? FontWeight.w600
                                          : FontWeight.w400,
                                      color: const Color(0xFF1A1A1A),
                                    ),
                                  ),
                                ),
                                if (isSelected)
                                  Icon(Icons.check,
                                      color: const Color(0xFF1A1A1A),
                                      size: 20.r),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '선택 완료',
            onPressed: _selected.isNotEmpty
                ? () => context.go('/onboarding/language/proficiency')
                : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }
}
