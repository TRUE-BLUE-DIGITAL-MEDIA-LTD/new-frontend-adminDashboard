import axios from "axios";
import Error from "next/error";
import { parseCookies } from "nookies";

interface ResponseGetProvincesInCountryService {
  query: {
    country: string;
  };
  results: string[];
}

interface InputGetProvincesInCountryService {
  countryCode: string;
}
export async function GetProvincesInCountryService(
  input: InputGetProvincesInCountryService
): Promise<ResponseGetProvincesInCountryService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const provinces = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/postcode/get-provinces`,
      {
        params: {
          ...input,
        },
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      }
    );

    return provinces.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

interface ResponseGetPostalCodesByStateService {
  query: {
    code: [];
    country: string;
  };
  results: {};
}
interface InputGetPostalCodesByStateService {
  state_name: string;
  country: string;
}
export async function GetPostalCodesByStateService(
  input: InputGetPostalCodesByStateService
): Promise<ResponseGetPostalCodesByStateService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const postalCodes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/postcode/get-cities`,
      {
        params: {
          ...input,
          limit: 30,
        },
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      }
    );
    return postalCodes.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}
