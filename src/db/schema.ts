
import { relations } from "drizzle-orm";
import { integer, numeric, pgEnum, pgTable, text, time, timestamp, uuid} from "drizzle-orm/pg-core";
import { on } from "events";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToClinics: many(usersToClinicsTable)
}))


export const usersToClinicsTable = pgTable("users_to_clinics", {
    userId: uuid("user_id").notNull().references(() => usersTable.id, {onDelete: "cascade"}),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersToClinicsTable.userId],
        references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
        fields: [usersToClinicsTable.clinicId],
        references: [clinicsTable.id],
    })
}))


export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appointments: many(appointmentsTable),
    usersToClinics: many(usersToClinicsTable)
}))


export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, {onDelete: "cascade"}), // se a clínica for deletada, o médico também será deletado
    name: text("name").notNull(),
    avatarImageUrl: text("avatar_image_url"),
    specialty: text("specialty").notNull(),
    availableFromWeekDay: integer("available_from_week_day").notNull(), // disponível de 1 (1 = segunda)
    availableToWeekDay: integer("available_from_week_day").notNull(), // disponível até 7 (7 = domingo) 
    availableFromTime: time("available_from_time").notNull(), // disponível das 
    availableToTime: time("available_to_time").notNull(), // disponível até
    appointmentPriceInCents: numeric("appointment_price_in_cents").notNull(), // preço da consulta em centavos P.S: o preço é em centavos para evitar problemas de precisão com números de ponto flutuante
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
        fields: [doctorsTable.clinicId],
        references: [clinicsTable.id],
    })
}))


export const patientSexEnum = pgEnum("patient_sex", ["male", "female"])

export const patientsTable = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, {onDelete: "cascade"}),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number").notNull(),
    sex: patientSexEnum("sex").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const patientsTableRelations = relations(patientsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
        fields: [patientsTable.clinicId],
        references: [clinicsTable.id],
    })
}))


export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    patientId: uuid("patient_id").notNull().references(() => patientsTable.id, {onDelete: "cascade"}),
    doctorId: uuid("doctor_id").notNull().references(() => doctorsTable.id, {onDelete: "cascade"}),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, {onDelete: "cascade"}),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
})

export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id],
    }),
    doctor: one(doctorsTable, {
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id],
    }),
    patient: one(patientsTable, {
        fields: [appointmentsTable.patientId],
        references: [patientsTable.id],
    })
}))