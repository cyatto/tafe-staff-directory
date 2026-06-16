import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { ScaledText as Text } from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Contact, getAvatarStyle, getInitials, getDepartmentName } from "../types";

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={dialogStyles.overlay}>
        <View style={dialogStyles.box}>
          <View style={dialogStyles.iconWrap}>
            <Ionicons name="warning-outline" size={26} color="#931c21" />
          </View>
          <Text style={dialogStyles.title}>{title}</Text>
          <Text style={dialogStyles.message}>{message}</Text>
          <View style={dialogStyles.btnRow}>
            <TouchableOpacity style={dialogStyles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
              <Text style={dialogStyles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dialogStyles.confirmBtn} onPress={onConfirm} activeOpacity={0.8}>
              <Text style={dialogStyles.confirmText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const dialogStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(26,10,13,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#fdf0f2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#1a0a0d", textAlign: "center" },
  message: { fontSize: 14, color: "#7a4a52", textAlign: "center", lineHeight: 20 },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 4, width: "100%" },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.2)",
    alignItems: "center",
  },
  cancelText: { fontSize: 15, fontWeight: "600", color: "#7a4a52" },
  confirmBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#931c21",
    alignItems: "center",
  },
  confirmText: { fontSize: 15, fontWeight: "600", color: "#fff" },
});

// ─── ActionsTab ───────────────────────────────────────────────────────────────

interface ActionsTabProps {
  selectedContact: Contact | null;
  onAdd: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onViewContact: (contact: Contact) => void;
}

export function ActionsTab({
  selectedContact,
  onAdd,
  onEdit,
  onDelete,
  onViewContact,
}: ActionsTabProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Red Opal Innovations</Text>
        <Text style={styles.headerTitle}>Actions</Text>
        <Text style={styles.headerSub}>Manage staff directory</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Selected contact */}
        <Text style={styles.sectionTitle}>Selected Contact</Text>
        {selectedContact ? (
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => onViewContact(selectedContact)}
            activeOpacity={0.8}
          >
            {(() => {
              const avatar = getAvatarStyle(selectedContact.name);
              return (
                <View style={[styles.avatar, { backgroundColor: avatar.bg }]}>
                  <Text style={[styles.avatarText, { color: avatar.fg }]}>
                    {getInitials(selectedContact.name)}
                  </Text>
                </View>
              );
            })()}
            <View style={styles.contactInfo}>
              <Text style={styles.contactName} numberOfLines={1}>{selectedContact.name}</Text>
              <Text style={styles.contactDept} numberOfLines={1}>
                {getDepartmentName(selectedContact.departmentId)}
              </Text>
            </View>
            <View style={styles.viewBadge}>
              <Text style={styles.viewBadgeText}>View</Text>
              <Ionicons name="chevron-forward" size={12} color="#931c21" />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.noContactCard}>
            <Ionicons name="information-circle-outline" size={16} color="#d4a0aa" />
            <Text style={styles.noContactText}>
              Select a staff member from the{" "}
              <Text style={styles.bold}>Directory</Text> or{" "}
              <Text style={styles.bold}>Search</Text> tab to enable Edit and Delete.
            </Text>
          </View>
        )}

        {/* Actions */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Available Actions</Text>

        {/* Add */}
        <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.85}>
          <View style={styles.addIcon}>
            <Ionicons name="person-add-outline" size={19} color="#fff" />
          </View>
          <View style={styles.btnInfo}>
            <Text style={styles.addBtnTitle}>Add Contact</Text>
            <Text style={styles.addBtnSub}>Create a new staff member profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        {/* Edit */}
        <TouchableOpacity
          style={[styles.secondaryBtn, !selectedContact && styles.btnDisabled]}
          onPress={() => selectedContact && onEdit(selectedContact)}
          activeOpacity={selectedContact ? 0.8 : 1}
          disabled={!selectedContact}
        >
          <View style={[styles.secondaryIcon, !selectedContact && styles.secondaryIconDisabled]}>
            <Ionicons name="pencil-outline" size={17} color={selectedContact ? "#931c21" : "#d4a0aa"} />
          </View>
          <View style={styles.btnInfo}>
            <Text style={[styles.secondaryBtnTitle, !selectedContact && styles.textDisabled]}>Edit Contact</Text>
            <Text style={styles.secondaryBtnSub}>
              {selectedContact
                ? `Update ${selectedContact.name.split(" ")[0]}'s profile`
                : "Select a contact first"}
            </Text>
          </View>
          {selectedContact && <Ionicons name="chevron-forward" size={16} color="#d4a0aa" />}
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          style={[styles.secondaryBtn, !selectedContact && styles.btnDisabled]}
          onPress={() => selectedContact && onDelete(selectedContact)}
          activeOpacity={selectedContact ? 0.8 : 1}
          disabled={!selectedContact}
        >
          <View style={[styles.secondaryIcon, !selectedContact && styles.secondaryIconDisabled]}>
            <Ionicons name="trash-outline" size={17} color={selectedContact ? "#931c21" : "#d4a0aa"} />
          </View>
          <View style={styles.btnInfo}>
            <Text style={[styles.secondaryBtnTitle, !selectedContact && styles.textDisabled]}>Delete Contact</Text>
            <Text style={styles.secondaryBtnSub}>
              {selectedContact
                ? `Remove ${selectedContact.name.split(" ")[0]} from the directory`
                : "Select a contact first"}
            </Text>
          </View>
          {selectedContact && <Ionicons name="chevron-forward" size={16} color="#d4a0aa" />}
        </TouchableOpacity>
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
    paddingBottom: 16,
    gap: 2,
  },
  headerLabel: {
    fontSize: 11, fontWeight: "600", letterSpacing: 2,
    color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)" },
  body: { flex: 1 },
  bodyContent: { padding: 16, gap: 10, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 11, fontWeight: "700", textTransform: "uppercase",
    letterSpacing: 1.5, color: "#7a4a52", paddingHorizontal: 4,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 15, fontWeight: "700" },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: "600", color: "#1a0a0d" },
  contactDept: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  viewBadge: { flexDirection: "row", alignItems: "center", gap: 2 },
  viewBadgeText: { fontSize: 11, fontWeight: "600", color: "#931c21" },
  noContactCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.08)",
  },
  noContactText: { flex: 1, fontSize: 13, color: "#7a4a52", lineHeight: 20 },
  bold: { fontWeight: "700", color: "#1a0a0d" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#931c21",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  addIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  btnInfo: { flex: 1 },
  addBtnTitle: { fontSize: 15, fontWeight: "700", color: "#fff" },
  addBtnSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  btnDisabled: { opacity: 0.5 },
  secondaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fdf0f2",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryIconDisabled: { backgroundColor: "#f5f0f0" },
  secondaryBtnTitle: { fontSize: 15, fontWeight: "700", color: "#1a0a0d" },
  secondaryBtnSub: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  textDisabled: { color: "#7a4a52" },
});
