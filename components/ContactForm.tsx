import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScaledText as Text } from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Contact, DEPARTMENTS } from "../types";

type FormData = {
  name: string;
  phone: string;
  departmentId: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

interface Props {
  contact: Contact | null;
  onSave: (data: Omit<Contact, "id"> & { id?: number }) => void;
  onCancel: () => void;
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[\d\s\-()+]{6,20}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (digits, spaces, and dashes only).";
  }
  if (!form.street.trim()) errors.street = "Street address is required.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.state.trim()) errors.state = "State is required.";
  if (!form.zip.trim()) {
    errors.zip = "Postcode is required.";
  } else if (!/^\d{4}$/.test(form.zip.trim())) {
    errors.zip = "Enter a valid 4-digit postcode (e.g. 2000).";
  }
  if (!form.country.trim()) errors.country = "Country is required.";
  return errors;
}

// Reusable field wrapper
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <View style={fieldStyles.container}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
      {error && (
        <View style={fieldStyles.errorRow}>
          <Ionicons name="alert-circle" size={12} color="#931c21" />
          <Text style={fieldStyles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  container: { gap: 4 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#7a4a52",
  },
  errorRow: { flexDirection: "row", alignItems: "flex-start", gap: 4, marginTop: 2 },
  errorText: { fontSize: 12, color: "#931c21", flex: 1, lineHeight: 16 },
});

function inputStyle(hasError: boolean) {
  return {
    ...styles.input,
    borderColor: hasError ? "#931c21" : "rgba(147,28,33,0.15)",
    backgroundColor: hasError ? "#fff5f6" : "#fdf0f2",
  };
}

const EMPTY_FORM: FormData = {
  name: "", phone: "", departmentId: 0,
  street: "", city: "", state: "", zip: "", country: "Australia",
};

export function ContactForm({ contact, onSave, onCancel }: Props) {
  const isEdit = contact !== null;
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name,
        phone: contact.phone,
        departmentId: contact.departmentId,
        street: contact.street,
        city: contact.city,
        state: contact.state,
        zip: contact.zip,
        country: contact.country,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setTouched(false);
  }, [contact]);

  function set(field: keyof FormData) {
    return (value: string | number) => {
      const updated = { ...form, [field]: value };
      setForm(updated);
      if (touched) setErrors(validate(updated));
    };
  }

  async function handleSubmit() {
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    setSaving(false);
    onSave(isEdit ? { ...form, id: contact!.id } : form);
  }

  const errorCount = Object.keys(validate(form)).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onCancel} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={16} color="rgba(255,255,255,0.75)" />
          <Text style={styles.backText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? `Edit ${contact!.name.split(" ")[0]}` : "Add Contact"}</Text>
        <Text style={styles.headerSub}>
          {isEdit ? "Update the details below" : "Fill in the details to add a new staff member"}
        </Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Validation summary */}
        {touched && errorCount > 0 && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={18} color="#931c21" />
            <View style={{ flex: 1 }}>
              <Text style={styles.errorBannerTitle}>
                Please fix {errorCount} {errorCount === 1 ? "error" : "errors"} before saving.
              </Text>
              <Text style={styles.errorBannerSub}>Check the highlighted fields below.</Text>
            </View>
          </View>
        )}

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.card}>
          <Field label="Full Name" error={errors.name}>
            <TextInput
              style={inputStyle(!!errors.name)}
              value={form.name}
              onChangeText={set("name")}
              placeholder="e.g. Jane Smith"
              placeholderTextColor="#d4a0aa"
              autoComplete="name"
            />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <TextInput
              style={inputStyle(!!errors.phone)}
              value={form.phone}
              onChangeText={set("phone")}
              placeholder="e.g. 02 9988 1234"
              placeholderTextColor="#d4a0aa"
              keyboardType="phone-pad"
            />
          </Field>
          <Field label="Department">
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.departmentId}
                onValueChange={(val) => set("departmentId")(val)}
                style={styles.picker}
              >
                {DEPARTMENTS.map((d) => (
                  <Picker.Item key={d.id} label={d.name} value={d.id} />
                ))}
              </Picker>
            </View>
          </Field>
        </View>

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.card}>
          <Field label="Street" error={errors.street}>
            <TextInput
              style={inputStyle(!!errors.street)}
              value={form.street}
              onChangeText={set("street")}
              placeholder="e.g. 1 Code Lane"
              placeholderTextColor="#d4a0aa"
            />
          </Field>
          <View style={styles.row2}>
            <View style={{ flex: 1 }}>
              <Field label="City" error={errors.city}>
                <TextInput
                  style={inputStyle(!!errors.city)}
                  value={form.city}
                  onChangeText={set("city")}
                  placeholder="e.g. Sydney"
                  placeholderTextColor="#d4a0aa"
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="State" error={errors.state}>
                <TextInput
                  style={inputStyle(!!errors.state)}
                  value={form.state}
                  onChangeText={set("state")}
                  placeholder="e.g. NSW"
                  placeholderTextColor="#d4a0aa"
                />
              </Field>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={{ flex: 1 }}>
              <Field label="Postcode" error={errors.zip}>
                <TextInput
                  style={inputStyle(!!errors.zip)}
                  value={form.zip}
                  onChangeText={set("zip")}
                  placeholder="e.g. 2000"
                  placeholderTextColor="#d4a0aa"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="Country" error={errors.country}>
                <TextInput
                  style={inputStyle(!!errors.country)}
                  value={form.country}
                  onChangeText={set("country")}
                  placeholder="e.g. Australia"
                  placeholderTextColor="#d4a0aa"
                />
              </Field>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="save-outline" size={15} color="#fff" />
                <Text style={styles.saveBtnText}>{isEdit ? "Save Changes" : "Add Contact"}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f5f5" },
  header: {
    backgroundColor: "#931c21",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 20,
    gap: 4,
  },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  backText: { fontSize: 13, color: "rgba(255,255,255,0.75)" },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: "rgba(255,255,255,0.65)" },
  body: { flex: 1 },
  bodyContent: { padding: 16, gap: 12, paddingBottom: 40 },
  errorBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#fff5f6",
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.25)",
    borderRadius: 16,
    padding: 16,
  },
  errorBannerTitle: { fontSize: 13, fontWeight: "600", color: "#931c21" },
  errorBannerSub: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#7a4a52",
    paddingHorizontal: 4,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.08)",
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1a0a0d",
    borderWidth: 1,
  },
  pickerWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.15)",
    backgroundColor: "#fdf0f2",
    overflow: "hidden",
  },
  picker: { color: "#1a0a0d" },
  row2: { flexDirection: "row", gap: 12 },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.2)",
    alignItems: "center",
  },
  cancelBtnText: { fontSize: 15, fontWeight: "600", color: "#7a4a52" },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#931c21",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { fontSize: 15, fontWeight: "600", color: "#fff" },
});
