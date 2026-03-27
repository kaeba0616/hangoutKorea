import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: matching-1, matching-2 - 위치 설정
/// - AppBar "위치 설정" (또는 검색바)
/// - 지도 영역 (녹색 원 반경 표시)
/// - 매칭 반경 슬라이더 (5km ~ 20km)
/// - "이 위치로 설정" 버튼
class MatchingLocationScreen extends StatefulWidget {
  const MatchingLocationScreen({super.key});

  @override
  State<MatchingLocationScreen> createState() => _MatchingLocationScreenState();
}

class _MatchingLocationScreenState extends State<MatchingLocationScreen> {
  double _radius = 13;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const HangkoAppBar(title: '위치 설정'),
      body: Column(
        children: [
          // 지도 영역 placeholder
          Expanded(
            child: Stack(
              children: [
                Container(
                  color: const Color(0xFFE8F0E8),
                  child: Center(
                    child: Container(
                      width: 200.r,
                      height: 200.r,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: const Color(0xFF4CAF50).withValues(alpha: 0.15),
                        border: Border.all(
                          color: const Color(0xFF4CAF50).withValues(alpha: 0.3),
                          width: 2,
                        ),
                      ),
                      child: Center(
                        child: Container(
                          width: 16.r,
                          height: 16.r,
                          decoration: const BoxDecoration(
                            color: Color(0xFF4CAF50),
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                // GPS 버튼
                Positioned(
                  right: 16.w,
                  bottom: 16.h,
                  child: Container(
                    width: 44.r,
                    height: 44.r,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black12,
                          blurRadius: 8.r,
                        ),
                      ],
                    ),
                    child: Icon(Icons.my_location,
                        size: 22.r, color: const Color(0xFF374151)),
                  ),
                ),
              ],
            ),
          ),
          // 매칭 반경 설정
          Container(
            padding: EdgeInsets.all(24.w),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFF3F4F6))),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '매칭 반경',
                      style: TextStyle(
                        fontSize: 15.sp,
                        fontWeight: FontWeight.w600,
                        color: const Color(0xFF1A1A1A),
                      ),
                    ),
                    Text(
                      '${_radius.toInt()}km',
                      style: TextStyle(
                        fontSize: 15.sp,
                        fontWeight: FontWeight.w600,
                        color: const Color(0xFF4CAF50),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 8.h),
                SliderTheme(
                  data: SliderThemeData(
                    activeTrackColor: const Color(0xFF4CAF50),
                    inactiveTrackColor: const Color(0xFFE5E7EB),
                    thumbColor: const Color(0xFF4CAF50),
                    trackHeight: 4.h,
                  ),
                  child: Slider(
                    value: _radius,
                    min: 5,
                    max: 20,
                    onChanged: (v) => setState(() => _radius = v),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('5km',
                        style: TextStyle(
                            fontSize: 12.sp, color: const Color(0xFF9CA3AF))),
                    Text('10km',
                        style: TextStyle(
                            fontSize: 12.sp, color: const Color(0xFF9CA3AF))),
                    Text('15km',
                        style: TextStyle(
                            fontSize: 12.sp, color: const Color(0xFF9CA3AF))),
                    Text('20km',
                        style: TextStyle(
                            fontSize: 12.sp, color: const Color(0xFF9CA3AF))),
                  ],
                ),
                SizedBox(height: 8.h),
                Text(
                  '서울특별시 강남구 신사동\n반경 ${_radius.toInt()}km 이내',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: const Color(0xFF6B7280),
                    height: 1.4,
                  ),
                ),
                SizedBox(height: 16.h),
                HangkoButton(
                  label: '이 위치로 설정',
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
