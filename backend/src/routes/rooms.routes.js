import { Router } from "express";
import {
  listRooms,
  getRoomById,
  createRoom,
  updateRoom,
  updateRoomStatus,
  deleteRoom,
} from "../controllers/roomsController.js";

const router = Router();

router.get("/", listRooms);
router.get("/:id", getRoomById);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.patch("/:id/status", updateRoomStatus);
router.delete("/:id", deleteRoom);

export default router;
