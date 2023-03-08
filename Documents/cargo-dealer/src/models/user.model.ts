import { Schema, model, Document } from "mongoose";
import { v4 } from "uuid";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  uid: string;
  email: string;
  password: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isAllowedToRide: boolean;
  accountType: {
    type: string;
    isDealer: boolean;
  };
  country: string;
  isOnline: boolean;
  vehicleType: string;
  isVerifed: boolean;
  kycStatus: string;
  createdAt: Date;
  otpSendCount: number;
  otpInputCount: number;
  pauseOtpSend: boolean;
  pauseOtpSendUntil: Date;
  pauseOtpInput: boolean;
  pauseOtpInputUntil: Date;
  walletBalance: number;
  isDriverTypeSelected: boolean;
  pin: string;
  avatar: {
    url: string;
    publicId: string;
  };
  defaultAddress: {
    address: string;
    placeId: string;
    lat: number;
    lng: number;
  };
  key: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

// enum accountType {
//   admin = "admin",
//   user = "user",
//   business = "business",
// }

enum kycStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

const User = new Schema<IUser>({
  avatar: {
    type: Object,
    default: {
      url: "",
      publicId: "",
    },
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  pin: {
    type: String,
    default: "",
  },
  uid: {
    type: String,
    required: true,
    default: v4(),
    unique: true,
  },
  country: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  vehicleType: {
    type: String,
    default: "",
  },
  password: {},
  phoneNumber: {
    type: String,
    default: "",
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isVerifed: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: Object,
    default: {
      type: "user",
      isDealer: false,
    },
  },
  kycStatus: {
    type: String,
    enum: Object.values(kycStatus),
    default: kycStatus.pending,
  },
  isDriverTypeSelected: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otpSendCount: {
    type: Number,
    default: 0,
  },
  otpInputCount: {
    type: Number,
    default: 0,
  },
  pauseOtpSend: {
    type: Boolean,
    default: false,
  },
  pauseOtpSendUntil: {
    type: Date,
    default: null,
  },
  pauseOtpInput: {
    type: Boolean,
    default: false,
  },
  pauseOtpInputUntil: {
    type: Date,
    default: null,
  },
  isAllowedToRide: {
    type: Boolean,
    default: false,
  },
  defaultAddress: {
    type: Object,
    default: {
      address: "",
      placeId: "",
      lat: 0,
      lng: 0,
    },
  },
  key: {
    type: String,
    default: v4(),
  },
  location: {
    // type: Object,
    // default: {
    //   type: "Point",
    //   // coordinates: [0, 0],
    // },
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [],
    },
  },
});

User.index({ location: "2dsphere" });

export default model<IUser>("Users", User);
