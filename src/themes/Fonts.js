const type = {
  base: 'SourceSansPro-Regular',
  bold: 'SourceSansPro-SemiBold',
  emphasis: 'SourceSansPro-Light',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const Weight = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

const Color = {
  textGray700: '#4a5568',
  textGray200: '#edf2f7',
  textBlue700: '#2b6cb0',
  textBlue300: '#90cdf4',
  white: '#fff',
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  h2: {
    fontFamily: type.base,
    fontSize: size.h2,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  h6: {
    fontFamily: type.emphasis,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  medium: {
    fontFamily: type.base,
    fontSize: size.medium,
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  labelProfile: {
    fontFamily: type.emphasis,
    fontSize: size.medium,
    fontWeight: Weight.medium,
    lineHeight: size.regular * 1.333,
    color: Color.textGray700,
  },
  labelDateAppoinment: {
    fontWeight: Weight.bold,
    color: Color.textBlue700,
  },
  labelMonthAppoinment: {
    fontWeight: Weight.bold,
    color: Color.textGray700,
  },
  labelNameAppoinment: {
    fontWeight: Weight.medium,
    fontSize: size.medium,
    color: Color.textBlue700,
  },
  labelMenu: {
    fontWeight: Weight.semibold,
    fontSize: size.input,
    color: Color.textGray200,
  },
  labelsubMenu: {
    fontWeight: Weight.bold,
    fontSize: size.medium,
    color: Color.textGray200,
  },
  labelBerita: {
    fontFamily: type.bold,
    fontSize: size.small,
    color: Color.textGray700,
  },
  articleTitle: {
    fontFamily: type.bold,
    fontWeight: Weight.bold,
    fontSize: size.regular,
    lineHeight: size.regular * 1.333,
    color: Color.textGray700,
  },
  articleSubTitle: {
    flexWrap: 'wrap',
    fontFamily: type.bold,
    fontSize: size.medium,
    opacity: 0.5,
    color: Color.textGray700,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    color: Color.textGray700,
  },
  greetingText: {
    fontFamily: type.base,
    fontSize: size.h6,
    fontWeight: Weight.bold,
    lineHeight: 20,
    color: Color.textGray700,
  },
};

export default {
  type,
  size,
  style,
  Weight,
  Color,
};
