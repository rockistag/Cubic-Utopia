import { world, system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

let activeReports = [];

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag('reportmenu')) {
            showMainMenu(player);
            player.runCommand('tag @s remove reportmenu');
        }
    }
});

world.beforeEvents.itemUse.subscribe((eventData) => {
    if (eventData.itemStack.typeId === "minecraft:emerald") {
        system.run(() => showMainMenu(eventData.source));
    }
});



function showMainMenu(player) {
    const form = new ActionFormData()

        form.title("Forms")
        form.body("Forms Menu. Menu Template from Timoxa Craft on MCPEDL!")
        form.button("Create Form")
        if (player.hasTag('admin')) form.button("View Forms");

    form.show(player).then((response) => {
        if (response.canceled) return;

        if (response.selection === 0) {
            showReportForm(player);
        } else if (response.selection === 1) {
            if (player.hasTag("admin")) {
                showAdminDashboard(player);
            } else {
                player.playSound("note.bass");

                player.sendMessage("You do not have access to viewing of forms.");
            }
        }
    });
}

function showReportForm(player) {
    const form = new ModalFormData()
        .title("Forms")
        .textField("Form Subject", "Request or Report? What for?")
        .textField("Reason for Form", "Explain your Report or Request");

    form.show(player).then((response) => {
        if (response.canceled) return;

        const [targetName, reason] = response.formValues;

        if (!targetName || !reason) {
            player.sendMessage("You cannot submit an empty form.");
            return;
        }

        const newReport = {
            id: Date.now(),
            from: player.name,
            target: targetName,
            reason: reason,
            time: new Date().toLocaleTimeString()
        };

        activeReports.push(newReport);
        player.playSound("random.levelup");


        player.sendMessage("Form successfully made!");
    });
}

function showAdminDashboard(admin) {

    const form = new ActionFormData()
        .title("Forms")
        .body(`Active Forms: ${activeReports.length}`);
    if (activeReports.length === 0) {
        form.button("Refresh Forms");
    } else {
        activeReports.forEach((report) => {
            const shortReason = report.reason.length > 20 ? report.reason.slice(0, 20) + "..." : report.reason;
            form.button(` ${report.target}\n${shortReason}`);
        });
    }

    form.show(admin).then((response) => {
        if (response.canceled) return;

        if (activeReports.length === 0) {
            showAdminDashboard(admin);
            return;
        }

        const selectedReport = activeReports[response.selection];
        if (!selectedReport) {
            admin.sendMessage({ translate: "Form not found." });
            showAdminDashboard(admin);
            return;
        }

        showReportDetails(admin, selectedReport, response.selection);
    });
}

function showReportDetails(admin, report, index) {

    const detailsText = ` From: ${report.from}\n Time: ${report.time}\n-------------\n REASON:\n§l${report.reason}§r`;

    const form = new MessageFormData()
        .title(report.target)
        .body(detailsText)
        .button1("Delete Form")
        .button2("Back");

    form.show(admin).then((response) => {
        if (response.canceled) return;

        if (response.selection === 0) {
            if (activeReports[index] && activeReports[index].id === report.id) {
                activeReports.splice(index, 1);
                admin.sendMessage({ translate: "Form Deleted." });
            } else {
                admin.sendMessage({ translate: "List changed, Form not found." });
            }
            showAdminDashboard(admin);
        } else {
            showAdminDashboard(admin);
        }
    });
}