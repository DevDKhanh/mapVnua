export const useConvertCoin = (coin: number = 0) => {
    return coin.toLocaleString('en-GB', { maximumFractionDigits: 2 });
};
