import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

export type ReviewItemData = {
  id: string;
  reviewer: string;
  reviewerInitial?: string;
  reviewerColor?: string;
  reviewerPhoto?: ImageSourcePropType;
  date: string;
  text: string;
  photoColor?: string;
  photo?: ImageSourcePropType;
  photoCount?: number;
};

const PHOTO_COLORS = ['#F2A07B', '#7B9EF2', '#A6D26A', '#9B7BC4', '#7BC4E0', '#E07BC4'];

export function ReviewItem({ data }: { data: ReviewItemData }) {
  const fallbackColor =
    data.photoColor ?? PHOTO_COLORS[data.id.charCodeAt(data.id.length - 1) % PHOTO_COLORS.length];

  return (
    <View
      style={{
        backgroundColor: colors.surface.background,
        borderWidth: 1,
        borderColor: colors.surface.divider,
        borderRadius: radius.md,
        padding: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {data.reviewerPhoto ? (
              <Image
                source={data.reviewerPhoto}
                style={{ width: 32, height: 32, borderRadius: radius.full }}
              />
            ) : (
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: radius.full,
                  backgroundColor: data.reviewerColor ?? colors.surface.divider,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.xs,
                    color: colors.text.inverse,
                  }}
                >
                  {data.reviewerInitial ?? data.reviewer.charAt(0)}
                </Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {data.reviewer}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.tertiary,
                  marginTop: 2,
                }}
              >
                {data.date}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.md,
              letterSpacing: typography.letterSpacing,
            }}
            numberOfLines={3}
          >
            {data.text}
          </Text>
        </View>
        <View style={{ width: 80, height: 80, borderRadius: radius.md, overflow: 'hidden' }}>
          {data.photo ? (
            <Image source={data.photo} style={{ width: 80, height: 80 }} />
          ) : (
            <View style={{ width: 80, height: 80, backgroundColor: fallbackColor, opacity: 0.85 }} />
          )}
          {data.photoCount && data.photoCount > 1 ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                paddingHorizontal: 6,
                paddingVertical: 2,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderTopRightRadius: radius.md,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: '#FFFFFF',
                }}
              >
                {`${data.photoCount}+`}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
