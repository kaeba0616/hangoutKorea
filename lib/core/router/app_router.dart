import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../features/splash/splash_screen.dart';
import '../../features/auth/screens/auth_entry_screen.dart';
import '../../features/auth/screens/email_login_screen.dart';
import '../../features/auth/screens/email_signup_screen.dart';
import '../../features/terms/screens/terms_detail_screen.dart';
import '../../features/onboarding/screens/profile_setup_screen.dart';
import '../../features/onboarding/screens/language_select_screen.dart';
import '../../features/onboarding/screens/language_proficiency_screen.dart';
import '../../features/onboarding/screens/nationality_select_screen.dart';
import '../../features/onboarding/screens/onboarding_complete_screen.dart';
import '../../features/profile/screens/my_profile_screen.dart';
import '../../features/profile/screens/other_profile_screen.dart';
import '../../features/profile/screens/profile_edit_screen.dart';
import '../../features/profile/screens/profile_menu_screen.dart';
import '../../features/profile/screens/follower_list_screen.dart';
import '../../features/profile/screens/following_list_screen.dart';
import '../../features/profile/screens/review_list_screen.dart';
import '../../features/profile/screens/review_detail_screen.dart';
import '../../features/profile/screens/write_review_screen.dart';
import '../../features/chat/screens/chat_list_screen.dart';
import '../../features/chat/screens/chat_room_screen.dart';
import '../../features/chat/screens/create_appointment_screen.dart';
import '../../features/matching/screens/matching_main_screen.dart';
import '../../features/matching/screens/matching_location_screen.dart';
import '../../features/matching/screens/matching_loading_screen.dart';
import '../../features/matching/screens/matching_result_screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    // Splash
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),

    // Auth
    GoRoute(
      path: '/auth',
      builder: (context, state) => const AuthEntryScreen(),
    ),
    GoRoute(
      path: '/auth/login',
      builder: (context, state) => const EmailLoginScreen(),
    ),
    GoRoute(
      path: '/auth/signup',
      builder: (context, state) => const EmailSignupScreen(),
    ),
    GoRoute(
      path: '/auth/terms',
      builder: (context, state) => const TermsDetailScreen(),
    ),

    // Onboarding
    GoRoute(
      path: '/onboarding/profile',
      builder: (context, state) => const ProfileSetupScreen(),
    ),
    GoRoute(
      path: '/onboarding/language',
      builder: (context, state) => const LanguageSelectScreen(),
    ),
    GoRoute(
      path: '/onboarding/language/proficiency',
      builder: (context, state) => const LanguageProficiencyScreen(),
    ),
    GoRoute(
      path: '/onboarding/nationality',
      builder: (context, state) => const NationalitySelectScreen(),
    ),
    GoRoute(
      path: '/onboarding/complete',
      builder: (context, state) => const OnboardingCompleteScreen(),
    ),

    // Main app with bottom navigation
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) =>
          MainShell(location: state.uri.toString(), child: child),
      routes: [
        GoRoute(
          path: '/chat',
          builder: (context, state) => const ChatListScreen(),
        ),
        GoRoute(
          path: '/matching',
          builder: (context, state) => const MatchingMainScreen(),
        ),
        GoRoute(
          path: '/profile/me',
          builder: (context, state) => const MyProfileScreen(),
        ),
      ],
    ),

    // Chat sub-screens (outside shell for full-screen)
    GoRoute(
      path: '/chat/room/:chatId',
      builder: (context, state) => ChatRoomScreen(
        chatId: state.pathParameters['chatId']!,
      ),
    ),
    GoRoute(
      path: '/chat/appointment',
      builder: (context, state) => const CreateAppointmentScreen(),
    ),

    // Matching sub-screens
    GoRoute(
      path: '/matching/location',
      builder: (context, state) => const MatchingLocationScreen(),
    ),
    GoRoute(
      path: '/matching/loading',
      builder: (context, state) => const MatchingLoadingScreen(),
    ),
    GoRoute(
      path: '/matching/result',
      builder: (context, state) => const MatchingResultScreen(),
    ),

    // Profile sub-screens
    GoRoute(
      path: '/profile/:userId',
      builder: (context, state) => OtherProfileScreen(
        userId: state.pathParameters['userId']!,
      ),
    ),
    GoRoute(
      path: '/profile/me/edit',
      builder: (context, state) => const ProfileEditScreen(),
    ),
    GoRoute(
      path: '/profile/me/menu',
      builder: (context, state) => const ProfileMenuScreen(),
    ),
    GoRoute(
      path: '/profile/:userId/followers',
      builder: (context, state) => FollowerListScreen(
        userId: state.pathParameters['userId']!,
      ),
    ),
    GoRoute(
      path: '/profile/:userId/following',
      builder: (context, state) => FollowingListScreen(
        userId: state.pathParameters['userId']!,
      ),
    ),
    GoRoute(
      path: '/profile/:userId/reviews',
      builder: (context, state) => ReviewListScreen(
        userId: state.pathParameters['userId']!,
      ),
    ),
    GoRoute(
      path: '/review/:reviewId',
      builder: (context, state) => ReviewDetailScreen(
        reviewId: state.pathParameters['reviewId']!,
      ),
    ),
    GoRoute(
      path: '/review/write/:targetUserId',
      builder: (context, state) => WriteReviewScreen(
        targetUserId: state.pathParameters['targetUserId']!,
      ),
    ),
  ],
);

/// Figma 하단 네비게이션: 채팅 / 매칭 / 커뮤니티 / 프로필
class MainShell extends StatelessWidget {
  final String location;
  final Widget child;

  const MainShell({super.key, required this.location, required this.child});

  int get _currentIndex {
    if (location.startsWith('/chat')) return 0;
    if (location.startsWith('/matching')) return 1;
    if (location.startsWith('/community')) return 2;
    if (location.startsWith('/profile')) return 3;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF1A1A1A),
        unselectedItemColor: const Color(0xFF9CA3AF),
        backgroundColor: Colors.white,
        elevation: 0,
        selectedFontSize: 11.sp,
        unselectedFontSize: 11.sp,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go('/chat');
            case 1:
              context.go('/matching');
            case 2:
              // 커뮤니티 (아직 미구현)
              break;
            case 3:
              context.go('/profile/me');
          }
        },
        items: const [
          BottomNavigationBarItem(
              icon: Icon(Icons.chat_bubble_outline), label: '채팅'),
          BottomNavigationBarItem(
              icon: Icon(Icons.favorite_border), label: '매칭'),
          BottomNavigationBarItem(
              icon: Icon(Icons.public), label: '커뮤니티'),
          BottomNavigationBarItem(
              icon: Icon(Icons.person_outline), label: '프로필'),
        ],
      ),
    );
  }
}
