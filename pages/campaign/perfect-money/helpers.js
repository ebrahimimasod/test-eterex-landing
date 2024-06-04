import http from "~/httpservices/HttpService.js"

const baseURL = process.env.API_URL;

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${token}`
  }
}

export const copyText = async (value) => {
  try {
    await navigator?.clipboard?.writeText(value)
  } catch (e) {
    console.log(e)
  }
}

export function redirectToPanel(app,message="اطلاعات شما قبلا تکمیل شده است. برای ادامه به پنل اتراکس هدایت خواهید شد.") {
  app.$toast(message, {
    position: 'top-center',
    rtl: true,
    type: 'info'
  });
  setTimeout(() => {
    window.location.href = 'https://panel.eterex.com/sign-enter-mobile?step=forgetPassword'
  }, 5000);
}

export function httpAuthRegister(phoneNumber) {
  return http.post(`/Auth/register`, {
    countryCode: "98",
    number: phoneNumber
  }, {
    baseURL
  })
}

export function httpVerifyOtp(phoneNumber, code) {
  return http.post(`/Auth/register/sms/verify`, {
    "countryCode": "98",
    "number": phoneNumber,
    "code": code
  }, {
    baseURL
  })
}

export function httpCompletedRegister(data) {
  return http.post(`/Auth/register/complete`, {
    temporaryPassword: data.temporaryPassword,
    referralCode: data.referralCode,
  }, {
    baseURL
  })
}

export function httpMatchNationalCode(data) {
  return http.get(`/Accounts/matching-number-national`, {
    params: {
      NationalCode: data.nationalCode,
      BirthDate: data.birthDate,
      CountryCode: data.countryCode,
      Number: data.number,
    },
    baseURL,
    headers: getHeaders()
  })
}

export function httpMatchCardNumber(data) {
  return http.post(`/BankCards`, {
    cardNumber: data.cardNumber,
    exceptionOnNotMatching: true,
    name: "کاربر جدید",
    expiry: "01/01"
  }, {
    baseURL,
    headers: getHeaders()
  })
}

export function httpDepositRequest(data) {
  return http.post(`/Bank/deposit/request`, {
    amount: data.amount,
    asset: data.asset,
    cabllbackType: "FastPmBuy"
  }, {
    baseURL,
    headers: getHeaders()
  })
}

export function httpGetConfig() {
  return http.get(`/Configs/v2`, {
    baseURL,
  })
}

export function httpBuyPerfectMoney(irtAmount) {
  return http.post('/PerfectMoney/buy', {
    amount: irtAmount
  }, {
    baseURL,
    headers: getHeaders()
  });
}

export function httpVoucherCreatePerfectMoney(pmAmount, otpCode) {
  return http.post('/PerfectMoney/voucher/create', {
    amount: pmAmount
  }, {
    baseURL,
    headers: {
      ...getHeaders(),
      'mfa-sms': otpCode
    }
  });
}

export function httpSellPerfectMoney(code, number) {
  return http.post('/PerfectMoney/voucher/redeem-sell', {
    code,
    number,
  }, {
    baseURL,
    headers: getHeaders()
  });
}

export function httpGetAccount() {
  return http.get('/Accounts', {
    baseURL,
    headers: getHeaders()
  });
}

export function httpSendAuthenticator() {
  return http.get('/Authenticators/sms', {
    baseURL,
    headers: getHeaders()
  });
}

export function httpBankCards() {
  return http.get('/BankCards', {
    baseURL,
    headers: getHeaders()
  });
}

export function httpUserVerifications() {
  return http.get('/Accounts/verifications', {
    baseURL,
    headers: getHeaders()
  });
}
