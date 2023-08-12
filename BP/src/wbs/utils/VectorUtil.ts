import { Vector, Vector3 } from "@minecraft/server";

export class VectorUtil {
    private constructor() {};

    public static normalized(vector: Vector3): Vector3 {
        return Vector.divide(vector, this.length1(vector));
    }

    public static lengthSquared(vector: Vector3): number {
        return (vector.x * vector.x) + (vector.y * vector.y) + (vector.z * vector.z);
    }

    public static length1(vector: Vector3): number {
        return Math.sqrt(this.lengthSquared(vector));
    }

    public static withLength(vector: Vector3, length: number): Vector3 {
        return Vector.divide(vector, this.length1(vector) / length);
    }
}