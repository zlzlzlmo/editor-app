// CRA를 react-app-rewired를 사용하여 커스터마이즈하기
module.exports = function override(config, env) {
    // 특정 모듈이 발견되지 않았을때 대체 모듈 지정
    config.resolve.fallback = {
      ...config.resolve.fallback,
      constants: require.resolve('constants-browserify'),
      assert: require.resolve('assert/'),
      os: require.resolve('os-browserify/browser'),
    };
    // 특정 경고 무시
    config.ignoreWarnings = [
      {
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  };