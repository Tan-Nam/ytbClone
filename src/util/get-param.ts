export const getParam = {
  videoParamId: (location: any, name: any) => {
    if (!location || !location.search) {
      return null;
    }
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  },
};
