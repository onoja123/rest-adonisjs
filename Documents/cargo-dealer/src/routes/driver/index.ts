//get rides
import { Request, Router, Response, NextFunction } from "express";
import Users from "../../models/user.model";
import Trips from "../../models/trip.model";
import {
  comparePasswords,
  hashString,
  isValidLatLng,
  isValidName,
} from "../../helpers";
import Phone from "../../helpers/lib-phone";
import isEmail from "validator/lib/isEmail";
import multer from "multer";
import { multerConfigImg } from "../../controllers/uploads/multer";
import { vehicleTypes } from "../trip/get-details";
import validateColor from "validate-color";

const router: Router = Router();

router.use("/", (request: Request, response: Response, next: NextFunction) => {
  if (
    !request.user ||
    !request.user.uid ||
    request.user.accountType.type !== "driver"
  ) {
    return response.status(401).send({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  }
  next();
});

router.get(
  "/get-trips",
  async (
    req: Request<
      {},
      {},
      {
        page?: string;
        limit?: string;
        status?: string;
      }
    >,
    res: Response
  ) => {
    let { page, limit, status } = req.query;

    const tripStatus = ["pending", "accepted", "completed", "cancelled"];

    // tripStatus
    // if (!status || !tripStatus.includes(status))

    if (!page) {
      page = "1";
    }
    if (!limit) {
      limit = "20";
    }

    let trips = [];
    let totalTrips = 0;

    if (status) {
      try {
        // check if status is valid
        trips = await Trips.find({
          driver: req.user._id,
          status,
        })
          .sort({ createdAt: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .populate("driver", "firstname lastname avatar");

        totalTrips = await Trips.countDocuments({
          driver: req.user._id,
          status,
        });
      } catch (err) {
        return res.status(500).send({
          status: "error",
          message: "Unable to process request",
        });
      }
    } else {
      try {
        trips = await Trips.find({
          driver: req.user._id,
        })
          .sort({ createdAt: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .populate("driver", "firstname lastname avatar");

        totalTrips = await Trips.countDocuments({
          driver: req.user._id,
        });
      } catch (err) {
        return res.status(500).send({
          status: "error",
          message: "Unable to process request",
        });
      }
    }

    return res.status(200).send({
      status: "success",
      message: "Trips fetched successfully",
      data: {
        trips,
        totalTrips,
        currentPage: Number(page),
        totalPages: Math.ceil(totalTrips / Number(limit)),
      },
    });
  }
);

router.get(
  "/get-profile",
  async (
    req: Request<{
      uid: string;
    }>,
    res: Response
  ) => {
    if (!req.user || !req.user.uid) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }
    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "User details fetched successfully",
      data: {
        firstname: userDetails?.firstname,
        lastname: userDetails?.lastname,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
        uid: userDetails?.uid,
        avatar: userDetails?.avatar.url,
        isEmailVerified: userDetails?.isEmailVerified,
        isPhoneNumberVerified: userDetails?.isPhoneVerified,
        isProfileCompleted:
          userDetails.firstname && userDetails.lastname ? true : false,
        walletBalance: userDetails?.walletBalance,
      },
    });
  }
);
router.get(
  "/:uid/get-profile",
  async (
    req: Request<{
      uid: string;
    }>,
    res: Response
  ) => {
    if (!req.user || !req.user.uid) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (req.params.uid !== req.user.uid) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }
    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "User details fetched successfully",
      data: {
        firstname: userDetails?.firstname,
        lastname: userDetails?.lastname,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
        uid: userDetails?.uid,
        avatar: userDetails?.avatar.url,
        isEmailVerified: userDetails?.isEmailVerified,
        isPhoneNumberVerified: userDetails?.isPhoneVerified,
        isProfileCompleted:
          userDetails.firstname && userDetails.lastname ? true : false,
        walletBalance: userDetails?.walletBalance,
      },
    });
  }
);
router.post(
  "/:uid/update-profile",
  async (
    req: Request<
      {
        uid: string;
      },
      {},
      {
        firstname?: string;
        lastname?: string;
        email?: string;
        phoneNumber?: string;
      }
    >,
    res: Response
  ) => {
    if (!req.user || !req.user.uid) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (req.params.uid !== req.user.uid) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }

    // const { firstname, lastname, email, phoneNumber } = req.body;

    //update individual fields
    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    // if (req.body.firstname) {
    //   userDetails.firstname = req.body.firstname;
    // }
    const updateFields: any = {};
    // update every item in the request body

    // const firstname = req?.body?.firstname;
    if (req?.body?.firstname) {
      if (!isValidName(req.body.firstname)) {
        return res.status(400).send({
          status: "error",
          message: "Invalid firstname",
        });
      } else {
        updateFields["firstname"] = req.body.firstname;
      }
      // userDetails.firstname = req.body.firstname;
    }

    if (req?.body?.lastname) {
      if (!isValidName(req.body.lastname)) {
        return res.status(400).send({
          status: "error",
          message: "Invalid lastname",
        });
      } else {
        updateFields["lastname"] = req.body.lastname;
      }
    }

    if (req?.body?.email) {
      if (!isEmail(req.body.email)) {
        return res.status(400).send({
          status: "error",
          message: "Invalid email",
        });
      } else {
        const find = await Users.findOne({ email: req.body.email });
        if (find && find.uid !== req.user.uid) {
          return res.status(400).send({
            status: "error",
            message: "Email already used by user",
          });
        }
        updateFields["email"] = req.body.email;
        updateFields["isEmailVerified"] = false;
      }
    }

    if (req?.body?.phoneNumber) {
      let newNumber = req?.body?.phoneNumber;
      const phone = new Phone();
      if (req?.body?.phoneNumber[0] !== "+") {
        newNumber = `+${req?.body?.phoneNumber}`;
      }
      if (!phone.isValid(newNumber)) {
        return res.status(400).send({
          status: "error",
          message: "Invalid phone number",
          data: null,
        });
      }

      const internationalNumber = phone.getInternationNumber(newNumber);
      if (!internationalNumber) {
        return res.status(400).send({
          status: "error",
          message: "Invalid phone number",
          data: null,
        });
      }
      const find = await Users.findOne({ phoneNumber: newNumber });
      if (find && find.uid !== req.user.uid) {
        return res.status(400).send({
          status: "error",
          message: "Phone number already used by another user",
        });
      }
      if (!find) {
        updateFields["phoneNumber"] = internationalNumber;
        updateFields["isPhoneVerified"] = false;
      }
    }

    // check if updateFields is empty
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({
        status: "error",
        message: "No fields to update",
      });
    }

    try {
      const updatedUser = await Users.findOneAndUpdate(
        { uid: req.user.uid },
        { $set: updateFields },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send({
          status: "error",
          message: "User not found",
        });
      } else {
        return res.status(200).send({
          status: "success",
          message: "User details updated successfully",
          data: {
            firstname: updatedUser?.firstname,
            lastname: updatedUser?.lastname,
            email: updatedUser?.email,
            phoneNumber: updatedUser?.phoneNumber,
            uid: updatedUser?.uid,
            avatar: updatedUser?.avatar.url,
            isEmailVerified: updatedUser?.isEmailVerified,
            isPhoneNumberVerified: updatedUser?.isPhoneVerified,
            walletBalance: userDetails?.walletBalance,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: "error",
        message: "Unable to process request",
      });
    }

    // const updateFields = {
    //   firstname: req.body.firstname,
    //   lastname: req.body.lastname,
    //   email: req.body.email,
    //   phoneNumber: req.body.phoneNumber,
    // };

    // const updatedUser = await Users.findOneAndUpdate(
    //   { uid: req.user.uid },
    //   { $set: updateFields }
    // );

    // if (!updatedUser) {
    //   return res.status(404).send({
    //     status: "error",
    //     message: "User not found",
    //   });
    // }
  }
);

// router.post()

router.post(
  "/upload-documents",
  multerConfigImg.array("files") as any,
  async (req: Request, res: Response) => {
    // get all files
  }
);

// router.post("/:uid/update-profile", async (req: Request, res: Response) => {
//   if (!req.user || !req.user.uid) {
//     return res.status(401).send({
//       status: "error",
//       message: "Unauthorized",
//     });
//   }

//   if (req.params.uid !== req.user.uid) {
//     return res.status(401).send({
//       status: "error",
//       message: "Unauthorized",
//     });
//   }

//   //TODO: Get Required Fields
//   const updateFields = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     phoneNumber: req.body.phoneNumber,
//   };

//   const updatedUser = await Users.findOneAndUpdate(
//     { uid: req.user.uid },
//     { $set: updateFields }
//   );

//   if (!updatedUser) {
//     return res.status(404).send({
//       status: "error",
//       message: "User not found",
//     });
//   }
// });

router.post("/update-location", async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send({
      status: "error",
      message: "Latitude and Longitude are required",
    });
  }

  if (!isValidLatLng(Number(latitude), Number(longitude))) {
    return res.status(400).send({
      status: "error",
      message: "Latitude and Longitude are invalid",
    });
  }

  try {
    //check if latitude and longitude are valid
    const updatedUser = await Users.findOneAndUpdate(
      { uid: req.user.uid },
      {
        $set: { "location.coordinates": [Number(longitude), Number(latitude)] },
      }
    );

    if (!updatedUser) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "Location updated successfully",
    });
  } catch (err) {
    console.log("err:", err);

    return res.status(500).send({
      status: "error",
      message: "Unable to process request",
    });
  }
});

router.post(
  "/create-pin",
  async (
    req: Request<
      {},
      {},
      {
        pin: string;
      }
    >,
    res: Response
  ) => {
    const { pin } = req.body;

    if (!pin) {
      return res.status(400).json({
        status: "error",
        message: "Pin is required",
      });
    }
    if (isNaN(Number(pin))) {
      return res.send({
        status: "error",
        message: "Invalid pin",
      });
    }
    if (pin.length !== 4) {
      return res.status(400).json({
        status: "error",
        message: "Pin must be 4 digits",
      });
    }

    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (userDetails.pin) {
      return res.status(400).json({
        status: "error",
        message: "Pin already exists",
      });
    }

    let hashedPin: string;

    try {
      hashedPin = hashString(pin);
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!hashedPin) {
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }
    let updatedUser;

    try {
      updatedUser = await Users.findOneAndUpdate(
        { uid: req.user.uid },
        { $set: { pin: hashedPin } }
      );
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Pin created successfully",
    });
  }
);

router.post(
  "/verify-pin",
  async (req: Request<{}, {}, { pin: string }>, res: Response) => {
    const { pin } = req.body;

    if (!pin) {
      return res.status(400).json({
        status: "error",
        message: "Pin is required",
      });
    }

    if (isNaN(Number(pin))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    if (pin.length !== 4) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!userDetails.pin) {
      return res.status(400).json({
        status: "error",
        message: "Pin does not exist",
      });
    }

    let comparedPin: boolean;

    try {
      comparedPin = comparePasswords(pin, userDetails.pin);
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!comparedPin) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Pin verified successfully",
    });
  }
);

router.post(
  "/update-pin",
  async (
    req: Request<
      {},
      {},
      {
        pin: string;
        newPin: string;
      }
    >,
    res: Response
  ) => {
    const { pin, newPin } = req.body;

    if (!pin || !newPin) {
      return res.status(400).json({
        status: "error",
        message: "Old Pin and new pin are required",
      });
    }

    if (isNaN(Number(pin)) || isNaN(Number(newPin))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    if (pin.length !== 4 || newPin.length !== 4) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    const userDetails = await Users.findOne({ uid: req.user.uid });

    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!userDetails.pin) {
      return res.status(400).json({
        status: "error",
        message: "Pin does not exist",
      });
    }

    let comparedPin: boolean;

    try {
      comparedPin = comparePasswords(pin, userDetails.pin);
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!comparedPin) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pin",
      });
    }

    let hashedPin: string;

    try {
      hashedPin = hashString(newPin);
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!hashedPin) {
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    let updatedUser;

    try {
      updatedUser = await Users.findOneAndUpdate(
        { uid: req.user.uid },
        { $set: { pin: hashedPin } }
      );
    } catch (err) {
      console.log("err:", err);
      return res.status(400).json({
        status: "error",
        message: "unable to complete request",
      });
    }

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Pin updated successfully",
    });
  }
);

router.post(
  "/add-vehicle-details",
  async (
    request: Request<
      {},
      {},
      {
        vehicleType: string;
        maker: string;
        model: string;
        year: string;
        color: string;
        plateNumber: string;
      }
    >,
    response: Response
  ) => {
    const { vehicleType, maker, model, year, color, plateNumber } =
      request.body;

    if (!vehicleType || !maker || !model || !year || !color || !plateNumber) {
      return response.status(400).send({
        status: "error",
        message: "All fields are required",
      });
    }

    if (!vehicleTypes.includes(vehicleType)) {
      return response.status(400).send({
        status: "error",
        message: "Invalid vehicle type",
      });
    }

    //validate year
    if (year.length !== 4) {
      return response.status(400).send({
        status: "error",
        message: "Invalid year",
      });
    }

    if (isNaN(Number(year))) {
      return response.status(400).send({
        status: "error",
        message: "Invalid year",
      });
    }

    if (!validateColor(color)) {
      return response.status(400).send({
        status: "error",
        message: "Invalid color",
      });
    }

    // validate color

    // validate = (plateNumber) => {
  }
);

router.post(
  "/set-account-type",
  async (
    request: Request<{}, {}, { isDealer: boolean }>,
    response: Response
  ) => {
    const { isDealer } = request.body;
    if (isDealer === undefined) {
      return response.status(400).send({
        status: "error",
        message: "isDealer is required",
      });
    }

    if (typeof isDealer !== "boolean") {
      return response.status(400).send({
        status: "error",
        message: "Invalid isDealer",
      });
    }

    const user = await Users.findOne({
      uid: request.user.uid,
      "accountType.type": "driver",
    });

    if (!user) {
      return response.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    if (user.isDriverTypeSelected) {
      return response.status(400).send({
        status: "error",
        message: "Account type already selected contact support for help",
      });
    }
    let updatedUser;
    try {
      updatedUser = await Users.findOneAndUpdate(
        { uid: request.user.uid },
        {
          $set: {
            "accountType.isDealer": isDealer,
            isDriverTypeSelected: true,
          },
        }
      );

      if (!updatedUser) {
        return response.status(404).send({
          status: "error",
          message: "User not found",
        });
      } else {
        return response.status(200).send({
          status: "success",
          message: "Account type updated successfully",
        });
      }
    } catch (err) {
      return response.status(400).send({
        status: "error",
        message: "unable to complete request",
      });
    }
  }
);

// router.post("/add-driver",(req: Request, res: Response, next: NextFunction) => {))

// create driver
// edit drivver to organization
// delete driver
// verify driver
// upload driver documents /driver/documents

export default router;
