import { Schema, model, Document } from "mongoose";

export interface IVerification extends Document {
  user: Schema.Types.ObjectId;
  vehicleDetails: {
    vehicleType: string;
    vehicleNumber: string;
    vehicleColor: string;
  };
  driversImage: string;
  driverLicense: {
    licenseNumber: string;
    licenseExpiry: Date;
    licenseImage: string;
  };
  documents: Array<{
    documentName: string;
    documentImage: string;
  }>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const verification = new Schema<IVerification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    vehicleDetails: {
      vehicleType: {
        type: String,
        required: true
      },
      vehicleNumber:{
        type: String,
        required: true
      },
      vehicleColor: {
        type: String,
        required: true
      }

    },
    driversImage:{
      type: String,
      required: true
    },
    driverLicense: {
      licenseNumber: {
        type: String,
        required: true
      },
      licenseExpiry: {
        type: Date,
        required: true
      },
      licenseImage: {
        type: String,
        required: true
      }
    },
    documents: {
      documentName:{
        type: String,
        required: true
      },
    documentImage:{
      type: String,
      required: true
    }
    },
    status: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }

  }
)


export default model<IVerification>("Verification", verification);
