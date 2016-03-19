#!/bin/bash

set -e

# Release-dance code goes here.

# Constants
PRODUCT="Myles: modular styles for the Juris-M reference manager"
IS_BETA="false"
FORK="myles"
BRANCH="master"
CLIENT="myles"
VERSION_ROOT="1.1."
SIGNED_STUB="myles__modular_csl_m_styles_for_law-"

function build-the-plugin () {
    set-install-version
    find . -name '.hg' -prune -o \
        -name '.hgignore' -prune -o \
        -name '.gitmodules' -prune -o \
        -name '*~' -prune -o \
        -name '.git' -prune -o \
        -name 'attic' -prune -o \
        -name 'attic' -prune -o \
        -name '.hgsub' -prune -o \
        -name '.hgsubstate' -prune -o \
        -name '*.bak' -prune -o \
        -name '*.tmpl' -prune -o \
        -name 'version' -prune -o \
        -name 'jm-sh' -prune -o \
        -name 'releases' -prune -o \
        -name 'bin-lib' -prune -o \
        -name 'sh-lib' -prune -o \
        -name 'build.sh' -prune -o \
        -print | xargs zip "${XPI_FILE}" >> "${LOG_FILE}"
}

. jm-sh/frontend.sh
