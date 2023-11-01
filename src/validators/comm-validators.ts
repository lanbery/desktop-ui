export const isPhoneNumber = (phone: string | number | null): boolean => !!phone && /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(phone?.toString())
