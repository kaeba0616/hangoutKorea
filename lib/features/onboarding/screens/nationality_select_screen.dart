import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_search_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/profile/nationality (3610:3777)
/// - AppBar
/// - "국적을 선택하세요" heading
/// - SearchBar
/// - Country list with RadioItem / Country
/// - Bottom fixed button
class NationalitySelectScreen extends StatefulWidget {
  const NationalitySelectScreen({super.key});

  @override
  State<NationalitySelectScreen> createState() =>
      _NationalitySelectScreenState();
}

class _NationalitySelectScreenState extends State<NationalitySelectScreen> {
  final _searchController = TextEditingController();
  String? _selectedCountry;

  final _countries = [
    ('KR', '대한민국', '🇰🇷'),
    ('US', '미국', '🇺🇸'),
    ('JP', '일본', '🇯🇵'),
    ('CN', '중국', '🇨🇳'),
    ('GB', '영국', '🇬🇧'),
    ('FR', '프랑스', '🇫🇷'),
    ('DE', '독일', '🇩🇪'),
    ('CA', '캐나다', '🇨🇦'),
    ('AU', '호주', '🇦🇺'),
    ('TH', '태국', '🇹🇭'),
    ('VN', '베트남', '🇻🇳'),
    ('PH', '필리핀', '🇵🇭'),
  ];

  List<(String, String, String)> get _filteredCountries {
    final query = _searchController.text;
    if (query.isEmpty) return _countries;
    return _countries.where((c) => c.$2.contains(query)).toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HangkoAppBar(title: '국적'),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 32.h),
                  Text(
                    '국적을 선택하세요',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  HangkoSearchBar(
                    hintText: '검색해주세요...',
                    controller: _searchController,
                    onChanged: (_) => setState(() {}),
                  ),
                  SizedBox(height: 24.h),
                  // Country list
                  Expanded(
                    child: ListView.separated(
                      itemCount: _filteredCountries.length,
                      separatorBuilder: (_, __) => SizedBox(height: 12.h),
                      itemBuilder: (context, index) {
                        final (code, name, flag) = _filteredCountries[index];
                        final isSelected = _selectedCountry == code;
                        return InkWell(
                          onTap: () =>
                              setState(() => _selectedCountry = code),
                          child: Container(
                            height: 48.h,
                            padding: EdgeInsets.symmetric(horizontal: 16.w),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFFF0F0F0)
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(10.r),
                              border: isSelected
                                  ? Border.all(color: const Color(0xFF1A1A1A))
                                  : null,
                            ),
                            child: Row(
                              children: [
                                Text(flag, style: TextStyle(fontSize: 24.sp)),
                                SizedBox(width: 12.w),
                                Text(
                                  name,
                                  style: TextStyle(
                                    fontSize: 15.sp,
                                    fontWeight: isSelected
                                        ? FontWeight.w600
                                        : FontWeight.w400,
                                    color: isSelected
                                        ? const Color(0xFFEF4444)
                                        : const Color(0xFF1A1A1A),
                                  ),
                                ),
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
            onPressed: _selectedCountry != null
                ? () => context.go('/onboarding/complete')
                : null,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }
}
