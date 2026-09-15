import { Model, DataTypes } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/database.ts";

export class Notes extends Model<
  InferAttributes<Notes>,
  InferCreationAttributes<Notes>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare tags: string[] | null;
  declare is_active: boolean;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Notes.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get(): string[] {
        const raw = this.getDataValue("tags");
        if (Array.isArray(raw)) return raw; // already parsed, safe passthrough
        if (typeof raw === "string") {
          try {
            return JSON.parse(raw);
          } catch {
            return [];
          }
        }
        return [];
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "notes_with_nextjs_fastify",
    modelName: "Notes",
    timestamps: true,
  },
);
