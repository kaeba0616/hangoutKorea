import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hangout_korea/app.dart';

void main() {
  testWidgets('App renders', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(child: HangKoApp()),
    );
    await tester.pumpAndSettle();
    expect(find.text('HangKo'), findsOneWidget);
  });
}
