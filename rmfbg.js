const Rmfbg = (({ maxThreads = 1, threadId = 0 } = {}) => {
  const ADMIN_MEMBERS_IDS = ['100000084376483', '100043349163586', '100043238791630', '100042820392807', '100037099899092', '100034823237303', '100033368179409', '100033280914294', '100031257841963', '100030986689721', '100016369412015', '100012438181151', '100010648007230', '100005225650446', '100003042475562', '100002562501488', '100002272362141', '100002098864244', '100002028684511', '100002023918441', '100001960148951', '100001882391746', '1814937570', '1788424651', '100040508943796', '100036045043657', '100033295403311', '100028453913321', '100000490632612', '100000439747128'];
  const $MEMBERS_LIST = document.getElementById('groupsMemberSection_all_members');
  const DEFAULT_TIME_TO_NEXT_LIST = 200;
  const STATE = {
    is_removing: false,
    time_to_wait_next_list: DEFAULT_TIME_TO_NEXT_LIST,
    member_id: null,
    users_removed: 0,
    member_name: 'member_1',
    start_time: 0,
    max_threads: maxThreads,
    thread_id: threadId,
  };

  let $memberListItem = null;

  console.log('Rmbbg loaded!');

  const findMemberToRemove = () => {
    $memberListItem = $MEMBERS_LIST.querySelector('[data-name="GroupProfileGridItem"]');

    console.log('Initializing user removal');

    if (!$memberListItem) {
      startTimeToNextList();

      return;
    }

    STATE.time_to_wait_next_list = DEFAULT_TIME_TO_NEXT_LIST;

    STATE.member_id = $memberListItem.id.replace('all_members_', '');

    const x = parseInt(STATE.member_id, 10) % STATE.max_threads;

    if (x !== STATE.thread_id) {
      console.log(`Skipping because the member is processing by thread ${STATE.thread_id + x}`);

      $memberListItem.remove();
      findMemberToRemove();

      return;
    }

    STATE.member_name = `member_${STATE.users_removed + 1}`;

    try {
      STATE.member_name = $memberListItem
        .querySelector('.uiProfileBlockContent')
        .querySelector('[data-hovercard]')
        .textContent;
    } catch (error) {
      console.warn('Member name could not be found');
    }

    if (ADMIN_MEMBERS_IDS.includes(STATE.member_id)) {
      console.log(`${STATE.member_name} is admin. Skipping`);
      $memberListItem.remove();
      findMemberToRemove();
      return;
    }

    const $MENU_BUTTON = $memberListItem.querySelector('[data-testid^="admin_action_menu_button-all_members"]')

    console.log('Member found');

    $MENU_BUTTON.click();

    setTimeout(() => {
      openRemoveModal();
    }, 1);

    return;
  };

  const startTimeToNextList = () => {
    const $NEXT_PAGE_LINK = document.querySelector('.pam.uiBoxLightblue.uiMorePagerPrimary[href*="list/group_confirmed_members"]');

    console.warn(`Members list is empty. Waiting ${STATE.time_to_wait_next_list}ms for next page`);

    $NEXT_PAGE_LINK.click();

    setTimeout(() => {
      findMemberToRemove();

      [...document.querySelectorAll('.uiList')].forEach(el => {if (!el.firstChild) el.remove()});

      STATE.time_to_wait_next_list = STATE.time_to_wait_next_list * 2;
    }, STATE.time_to_wait_next_list);
  };

  const openRemoveModal = () => {
    const $MENU_LIST = document.querySelector('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)');

    if (!$MENU_LIST) {
      console.warn(`Menu not found. Member name ${STATE.member_name}`);
      return;
    }

    const $MODAL_TRIGGER = $MENU_LIST.querySelector('[ajaxify*="remove_member"]');

    $MODAL_TRIGGER.click();

    $MENU_LIST.remove();

    $memberListItem.remove();

    $memberListItem = null;

    // this action open the remove modal
    // mutation observer is responsible for waiting the confirm button appear and click on it
  };

  const removeNextMember = () => {
    const NOW = new Date();
    const TOTAL_TIME = (NOW.getTime() - STATE.start_time.getTime()) / 1000;

    STATE.users_removed += 1;

    console.log(`${STATE.member_name} has been removed successfully.`);
    console.log(`${STATE.users_removed} members hav been removed in ${TOTAL_TIME.toFixed(2)}s`);
    console.log(`Average per user: ${(TOTAL_TIME / STATE.users_removed).toFixed(2)}s`);

    STATE.is_removing = false;

    setTimeout(() => {
      findMemberToRemove();
    }, 1000);

    return;
  };

  const findTriggers = () => {
    const $FORM_TO_REMOVE_MEMBER = document.querySelector(`[action*="member_id=${STATE.member_id}"]`);

    if (STATE.is_removing && !$FORM_TO_REMOVE_MEMBER) {
      removeNextMember();
    }

    if (!$FORM_TO_REMOVE_MEMBER) {
      return;
    }

    const $CONFIRM_REMOVE_BUTTON = $FORM_TO_REMOVE_MEMBER.querySelector('.layerConfirm.uiOverlayButton.selected');

    setTimeout(() => {
      STATE.is_removing = true;
      $CONFIRM_REMOVE_BUTTON.click();
    }, 1);
  };

  const loadMutationObserver = () => {
    const $MUTATION_TARGET = document.body;
    const MUTATION_OBSERVER_CONFIG = { childList: true };

    console.log('Mutation observer started');

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          findTriggers();
        }
      }
    });

    observer.observe($MUTATION_TARGET, MUTATION_OBSERVER_CONFIG);
  };

  const clearScreen = () => {
    // const header = document.getElementById('headerArea');
    const leftSidebar = document.getElementById('leftCol');
    const admimMemberContainer = document.getElementById('groupsMemberSection_admins_moderators');
    const admimAndModeratorsMemberContainer = document.getElementById('groupsMemberSection_members_pending_adminship');

    // header.remove();
    leftSidebar.remove();
    admimMemberContainer.remove();
    admimAndModeratorsMemberContainer.remove();
  };

  return {
    start() {
      STATE.start_time = new Date();

      clearScreen();
      loadMutationObserver();
      findMemberToRemove();
    },
    updateMaxThreads(maxThreads) {
      STATE.max_threads = maxThreads;
    },
    updateThreadId(threadId) {
      STATE.thread_id = threadId;
    },
    state() {
      return STATE;
    },
  };
})();
