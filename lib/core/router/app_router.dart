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

final appRouter = GoRouter(
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

    // Profile
    GoRoute(
      path: '/profile/me',
      builder: (context, state) => const MyProfileScreen(),
    ),
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
