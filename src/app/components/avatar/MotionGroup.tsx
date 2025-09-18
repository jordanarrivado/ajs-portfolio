"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import * as THREE from "three";
import type { ComponentPropsWithoutRef } from "react";

type GroupProps = ComponentPropsWithoutRef<"group">;

const MotionGroup = motion.create(
  forwardRef<THREE.Group, GroupProps>(function MotionGroupBase(props, ref) {
    return <group ref={ref} {...props} />;
  })
);

export default MotionGroup;
